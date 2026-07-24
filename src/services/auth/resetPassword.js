import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const resetPassword = async (email) => {
    try{
        await sendPasswordResetEmail(auth, email);
        return {
            success: true,
            message: "Se ha enviado un correo electrónico para restablecer la contraseña.",
        }
    } catch (error) {
        console.log("Error al enviar el correo de restablecimiento de contraseña: ", error);
        return {
            success: false,
            message: error.message,
        }
    }
}