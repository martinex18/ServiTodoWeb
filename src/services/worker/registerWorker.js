// src/services/worker/registerWorker.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { geoCoordinates } from "../utils/geocoding";

/**
 * Registra un nuevo trabajador.
 * @param {Object} form - Datos del formulario
 */

export const registerWorker = async (form) => {
  let location = null;
  try {
    // Crear usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password,
    );

    const user = userCredential.user;

    if (form.hasLocal && form.address) {
      console.log("hasLocal:", form.hasLocal);
      console.log("address:", form.address);
      console.log("city:", form.city);
      try {
        const geoRes = await geoCoordinates(
          `${form.address}, ${form.city}, Colombia`,
        );
        console.log("geoRes:", geoRes);
        if (geoRes.success) {
          location = geoRes.coordinates;
        }
      } catch {
        console.warn("No se pudo geocalizar");
      }
    }
    console.log("Location a guardar:", location);

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "worker", user.uid), {
      name: form.name,
      type_id: form.type_id,
      id_number: form.id_number,
      birthdate: form.birthdate,
      phone: form.phone,
      city: form.city,
      job: form.job,
      exp: form.exp,
      hasLocal: form.hasLocal,
      address: form.address,
      email: form.email,
      location: location,
      role: "worker",
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error registrando worker:", error);
    return { success: false, message: error.message };
  }
};
