import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";

const API_URL = import.meta.env.VITE_API_URL;

export const sendOTP = async (phone) => {
    try{
        const response = await fetch(
            `${API_URL}/send-otp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone,
                }),
            }
        );

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error(error);
        return { success: false, message: firebaseErrorMessage(error.code) };
    }
}