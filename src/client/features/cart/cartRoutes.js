import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreatePayment from "./pages/createPayment";
import MyOrder from "./pages/MyOrder";
import ReturnPayment from "./pages/ReturnPayment";
import Success from "./pages/Success";

export const cartRoutes = [
    {
        path: "cart",
        element: <Cart />
    },
    {
        path: "checkout",
        element: <Checkout />
    },
    {
        path: "success/:orderId",
        element: <Success />
    },
    {
        path: "my-orders",
        element: <MyOrder />
    },
    {
        path: "create_payment_url/:orderId",
        element: <CreatePayment />
    },
    {
        path: "return_payment_url",
        element: <ReturnPayment />
    }
];