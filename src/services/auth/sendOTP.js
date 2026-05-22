import { auth } from "@/firebaseConfig"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";

export const sendOTP = async (phone, recaptchaVerifier) => {
    try{
        const confirmationResult = await signInWithPhoneNumber(
            auth, phone, recaptchaVerifier,
        );

        return { success: true, confirmationResult };
    } catch (error) {
        console.error(error);
        return { success: false, message: firebaseErrorMessage(error.code) };
    }
}