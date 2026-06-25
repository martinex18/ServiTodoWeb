import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";

const API_URL = import.meta.env.VITE_API_URL;

export const verifyOTP = async (phone, code) => {
    try{
        console.log("Enviando al backend: ", {phone, code});
        
        const response = await fetch(
            `${API_URL}/verify-otp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone,
                    code
                }),
            }
        );

        const data = await response.json();
        console.log("Repuesta backend: ", data);
        
        return data;
        
    } catch (error) {
        console.error("Error verificando OTP:", error);
        return { success: false, message: firebaseErrorMessage(error.code) };
    }
}