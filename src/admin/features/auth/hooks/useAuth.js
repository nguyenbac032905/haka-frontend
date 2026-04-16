import { useState } from "react";
import { checkLogin } from "../api/authService";
import { deleteCookie, setCookie } from "../../../../shared/helpers/cookie";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const user = await checkLogin(email, password);

      if (user && user.length > 0) {
        setCookie("tokenAdmin", user[0].token);
        setCookie("emailAdmin", user[0].email);
        return { success: true, user: user[0] };
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
      deleteCookie("tokenAdmin");
      deleteCookie("emailAdmin");
  }

  return { login, loading, logout };
}