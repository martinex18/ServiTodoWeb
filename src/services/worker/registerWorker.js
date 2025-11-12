// src/services/worker/registerWorker.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const firebaseAuth = getAuth(app);
const db = getFirestore(app);

/**
 * Registra un nuevo trabajador.
 * @param {Object} data - Datos del formulario
 */

export const registerWorker = async (form) => {
  try {
    // Crear usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      form.email,
      form.password
    );

    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "worker", user.uid), {
      name: form.name,
      id_number: form.id_number,
      phone: form.phone,
      city: form.city,
      job: form.job,
      email: form.email,
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error registrando worker:", error);
    return { success: false, message: error.message };
  }
};
