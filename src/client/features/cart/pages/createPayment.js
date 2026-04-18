import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useOrderById } from "../hooks/useOrderById";
import { useRedirect } from "../../../../shared/hooks/useRedirect";
import moment from "moment";
import qs from "qs";
import CryptoJS from "crypto-js";
import { useOrderItems } from "../hooks/useOrderItems";

const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();

    keys.forEach((key) => {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    });

    return sorted;
};

function CreatePayment() {
    const { orderId } = useParams();
    const { order } = useOrderById(orderId);
    const { orderItems } = useOrderItems(orderId);

    const hasRedirected = useRef(false);

    useEffect(() => {
        if (!order || !orderItems || orderItems.length === 0) return;
        if (hasRedirected.current) return;
        hasRedirected.current = true;

        const tmnCode = "HPWAW8S8";
        const secretKey = "32TWXI5U2TXZN0SAZF4YLGYZM69D1XQA";
        let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const returnUrl = "http://localhost:3000/return_payment_url";

        const createDate = moment().format("YYYYMMDDHHmmss");
        const expireDate = moment().add(15, "minutes").format("YYYYMMDDHHmmss");

        const amount = Math.round(
            orderItems.reduce((sum, item) => {
                return sum + ((1 - item.discountPercentage / 100) * item.price * item.quantity);
            }, 0)
        );

        let vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: tmnCode,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: orderId,
            vnp_OrderInfo: "Noi dung thanh toan",
            vnp_OrderType: "other",
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: "127.0.0.1",
            vnp_CreateDate: createDate,
            vnp_ExpireDate: expireDate,
        };

        // ✅ giống backend
        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });

        const signed = CryptoJS.HmacSHA512(signData, secretKey)
            .toString(CryptoJS.enc.Hex);

        vnp_Params["vnp_SecureHash"] = signed;

        const paymentUrl =
            vnpUrl + "?" + qs.stringify(vnp_Params, { encode: false });

        console.log("SIGN DATA:", signData);
        console.log("PAYMENT URL:", paymentUrl);

        // 🔥 redirect đúng
        window.location.href = paymentUrl;

    }, [order, orderItems]);

    return null;
}

export default CreatePayment;