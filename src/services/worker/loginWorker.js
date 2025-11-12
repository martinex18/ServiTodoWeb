import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseAuth = getAuth(app);
const db = getFirestore(app);

export const loginWorker = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;

    // Buscar los datos del worker en Firestore
    const docRef = doc(db, "worker", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const workerData = docSnap.data();
      return { success: true, user: { uid: user.uid, ...workerData } };
    } else {
      return {
        success: false,
        message: "No se encontró información del trabajador.",
      };
    }
  } catch (error) {
    console.log("error al iniciar: ", error);
    let message = "errro al iniciar: ";

    if (error.code === "auth/user-not-found") {
      message = "No existe una cuenta con este correo.";
    } else if (error.code === "auth/wrong-password") {
      message = "Contraseña incorrecta.";
    } else if (error.code === "auth/invalid-email") {
      message = "Correo inválido.";
    }

    return { success: false, message };
  }
};
