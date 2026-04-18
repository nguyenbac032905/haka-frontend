import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { checkLogin } from "./api/authService";

export const login = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try{
            const res = await checkLogin(data.email,data.password);
            if (!res || res.length === 0) {
                return thunkAPI.rejectWithValue("Sai email hoặc mật khẩu");
            }
            return res;

        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLogin: false,
        loading: true,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLogin = false
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
            state.loading=false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending,(state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled,(state,action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLogin = true;
            })
            .addCase(login.rejected, (state,action) => {
                state.loading=false;
                state.isLogin=false
                state.user=null;
                state.error=action.payload
            })
    }
})

export const {logout,loginSuccess} = authSlice.actions;

export default authSlice.reducer;