import { useState } from "react";
import { registerPost } from "../api/authService";
import { generateToken } from "../../../../shared/helpers/generateToken";

export function useAuth() {
    const [loading, setLoading] = useState(false);

    const register = async (option) => {
      setLoading(true);
      try{
        const payload = {
          email: option.email,
          fullName: option.fullName,
          password: option.password,
          tokenUser: generateToken(),
          status: "active",
          deleted: false
        }
        const user = await registerPost(payload);
        console.log(user)
        if(user){
          return {success: true, user: user}
        }
        return {success: false}
      }finally{
        setLoading(false);
      }
    }

  return { register, loading};
}