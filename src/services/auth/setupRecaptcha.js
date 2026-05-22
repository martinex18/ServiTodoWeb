import { auth } from "@/firebaseConfig"
import { RecaptchaVerifier } from "firebase/auth"

export const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
            }
        )
    }
}