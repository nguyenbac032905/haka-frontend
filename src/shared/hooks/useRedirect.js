import { useNavigate } from "react-router-dom";

export function useRedirect(){
    const navigate = useNavigate();
    const redirect = (path) => {
        navigate(path);
    };
    return {redirect}
}