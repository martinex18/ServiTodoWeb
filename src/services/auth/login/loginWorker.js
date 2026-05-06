import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export const loginWorker = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const user = userCredential.user;

        // Busca los datos del worker en Firestore
        const workerRef = doc(db, "users", user.uid);
        const workerSnap = await getDoc(workerRef);
        if (!workerSnap.exists()) {
            return {
                success: false,
                message: "Usuario no encontrado",
            };
        }

        const workerData = workerSnap.data();
        if (workerData.role !== "worker") {
            return {
                success: false,
                message: "Este usuario no es un trabajador",
            };
        }
        
        return {
            success: true,
            role: 'worker',
            user: { uid: user.uid, ...workerData },
        };
    } catch (error) {
        console.error("error al iniciar: ", error.code);
        let message = "Ocurrió un error al iniciar sesión. Intenta de nuevo.";

        if (error.code === "auth/invalid-credential") {
            message = "Correo o contraseña incorrectos.";
        } else if (error.code === "auth/invalid-email") {
            message = "El formato del correo no es válido.";
        } else if (error.code === "auth/too-many-requests") {
            message = "Demasiados intentos fallidos. Intenta de nuevo más tarde.";
        } else if (error.code === "auth/netwwork-requiest-faild") {
            message = "Sin conexión a internet. Verifica tu red.";
        } else if (error.code === "auth/user-disabled") {
            message = "Esta cuenta ha sido deshabilitada.";
        }

        return { success: false, message };
    };
}