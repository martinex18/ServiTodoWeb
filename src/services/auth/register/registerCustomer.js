import { signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

/**
 * Registra un nuevo cliente.
 * @param {Object} form - Datos del formulario
 */

export const registerCustomer = async (form) => {
  try {
    const userCredential = await signInWithPhoneNumber(
      auth,
      form.phone
    );

    const user = userCredential.user;

    // Guardar datos en Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: form.name,
      phone: form.phone,
      role: "client",
      isVerified: true,
      profileCompleted: false,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error registrando customer:", error);
    return { success: false, message: error.message };
  }
};
