import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Busca los datos del user en Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        success: false,
        message: "No se encontró el usuario",
      };
    }

    const userData = userSnap.data();

    return {
      success: true,
      role: userData.role,
      user: { uid: user.uid, ...userData },
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
  }
};
