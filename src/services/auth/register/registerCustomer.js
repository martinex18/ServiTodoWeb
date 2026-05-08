import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Registra un nuevo cliente.
 * @param {Object} form - Datos del formulario
 */

export const registerCustomer = async (form, user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    // Guardar datos en Firestore
    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        name: form.name,
        phone: form.phone,
        role: "client",
        isVerified: true,
        profileCompleted: false,
        createdAt: serverTimestamp(),
      })
    };

    return { success: true };
  } catch (error) {
    console.error("Error registrando customer:", error);
    return { success: false, message: error.message };
  }
};
