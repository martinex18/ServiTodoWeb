import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

/**
 * Registra un nuevo cliente.
 * @param {Object} data - Datos del formulario
 */

export const registerCustomer = async (form) => {
  try {
    // Crear usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password,
    );

    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "client", user.uid), {
      name: form.name,
      type_id: form.type_id,
      id_number: form.id_number,
      birthdate: form.birthdate,
      phone: form.phone,
      city: form.city,
      email: form.email,
      role: "client",
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error registrando customer:", error);
    return { success: false, message: error.message };
  }
};
