import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, getCartByUserId } from "./api/cartService";
import { addCartItem, deleteCartItem, deleteCartItemByCartId, getCartItemByCartId, updateCartItem } from "./api/cartItemService";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (userId, thunkAPI ) => {
        try{
            let cart = await getCartByUserId(userId);
            const cartId = cart[0].id;
            const items = await getCartItemByCartId(cartId);
            return {cartId, items}
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ cartId, product, quantity }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const items = state.cart.items;

            const existingItem = items.find(
                item => item.product_id == product.id
            );

            // 👉 nếu đã tồn tại → update quantity
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;

                await updateCartItem(existingItem.id, {
                    quantity: newQuantity
                });

                return {
                    ...existingItem,
                    quantity: newQuantity,
                    isUpdate: true
                };
            }

            // 👉 nếu chưa có → thêm mới
            const res = await addCartItem({
                cart_id: Number(cartId),
                product_id: product.id,
                quantity: quantity
            });

            return {
                ...res,
                isUpdate: false
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({itemId, quantity},thunkAPI) => {
        try {
            const result = await updateCartItem(itemId,{quantity: quantity});

            console.log(result)
            return { itemId, quantity };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async (itemId,thunkAPI) => {
        try {
            await deleteCartItem(itemId);
            return itemId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (cartId, thunkAPI) => {
        try {
            await deleteCartItemByCartId(cartId);
            return cartId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cartId: null,
        items: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
                .addCase(fetchCart.pending,(state) => {
                    state.loading = true
                })
                .addCase(fetchCart.fulfilled,(state,action) => {
                    state.loading = false;
                    state.cartId = action.payload.cartId;
                    state.items = action.payload.items
                })
                .addCase(fetchCart.rejected,(state) => {
                    state.loading=false
                })
                .addCase(updateQuantity.fulfilled, (state,action) => {
                    const item = state.items.find(i => i.id == action.payload.itemId);
                    if (item) {
                        item.quantity = action.payload.quantity;
                    }
                })
                .addCase(removeItem.fulfilled,(state,action) => {
                    state.items = state.items.filter(i => i.id != action.payload)
                })
                .addCase(addToCart.fulfilled, (state, action) => {
                    if (action.payload.isUpdate) {
                        const item = state.items.find(i => i.id === action.payload.id);
                        if (item) {
                            item.quantity = action.payload.quantity;
                        }
                    } else {
                        state.items.push(action.payload);
                    }
                })
                .addCase(clearCart.fulfilled, (state) => {
                    state.items = [];
                })
    }
})
export default cartSlice.reducer;