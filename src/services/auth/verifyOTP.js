import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";

export const verifyOTP = async (confirmationCode, code) => {
    try{
        const result = await confirmationCode.confirm(code);

        return{ success: true, user: result.user };
    } catch (error) {
        console.error("Error verificando OTP:", error);
        return { success: false, message: firebaseErrorMessage(error.code) };
    }
}