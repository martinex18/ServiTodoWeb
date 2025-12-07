import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseAuth = getAuth(app);
const db = getFirestore(app);

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;

    // Busca los datos del worker en Firestore
    const workerRef = doc(db, "worker", user.uid);
    const workerSnap = await getDoc(workerRef);

    if (workerSnap.exists()) {
      const workerData = workerSnap.data();
      return { success: true, user: { uid: user.uid, ...workerData } };
    }

    // Busca los datos del customer en Firestore
    const customerRef = doc(db, "client", user.uid);
    const customerSnap = await getDoc(customerRef);

    if (customerSnap.exists()) {
      const customerData = customerSnap.data();
      return { success: true, user: { uid: user.uid, ...customerData } };
    }

    return {
      success: false,
      message: "No se encontró el usuario",
    };
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
