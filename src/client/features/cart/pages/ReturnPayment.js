import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import qs from "qs";
import CryptoJS from "crypto-js";
import { useUpdateOrderField } from "../hooks/useUpdateOrderField";

const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();

    keys.forEach((key) => {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    });

    return sorted;
};

function ReturnPayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleUpdateField } = useUpdateOrderField(); // ✅ đúng chỗ

    const [status, setStatus] = useState("processing");

    useEffect(() => {
        const query = qs.parse(location.search, { ignoreQueryPrefix: true });

        let vnp_Params = { ...query };

        const secureHash = vnp_Params["vnp_SecureHash"];

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });

        const secretKey = "32TWXI5U2TXZN0SAZF4YLGYZM69D1XQA";

        const signed = CryptoJS.HmacSHA512(signData, secretKey)
            .toString(CryptoJS.enc.Hex);

        if (secureHash === signed) {
            const orderId = vnp_Params["vnp_TxnRef"];
            const rspCode = vnp_Params["vnp_ResponseCode"];

            if (rspCode === "00") {
                setStatus("success");

                // ✅ update DB
                handleUpdateField(orderId, "paymentStatus", "paid");

                setTimeout(() => {
                    navigate(`/success/${orderId}`);
                }, 1500);

            } else {
                setStatus("failed");
            }
        } else {
            setStatus("invalid");
        }

    }, [location, navigate, handleUpdateField]); // ✅ fix dependency

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            {status === "processing" && <h2>Đang xử lý thanh toán...</h2>}
            {status === "success" && <h2>Thanh toán thành công ✅</h2>}
            {status === "failed" && <h2>Thanh toán thất bại ❌</h2>}
            {status === "invalid" && <h2>Sai chữ ký ❌</h2>}
        </div>
    );
}

export default ReturnPayment;