import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { firebaseErrorMessage } from "@/services/utils/firebaseErrorMessage";

/**
 * Registra un nuevo cliente.
 * @param {Object} form - Datos del formulario
 * @param {Object} firebaseUser - Usuario de Firebase
 */

export const registerCustomer = async (form, firebaseUser) => {
  try {
    const userRef = doc(db, "users", firebaseUser.uid);
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

    return { success: true, user: firebaseUser };
  } catch (error) {
    console.error("Error registrando customer:", error);
    return { success: false, message: firebaseErrorMessage(error.code) };
  }
};
