import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { geoCoordinates } from "../../utils/geocoding";

/**
 * Registra un nuevo trabajador.
 * @param {Object} form - Datos del formulario
*/

export const registerWorker = async (form) => {

  let location = null;

  try {
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
      console.log("department:", form.department);

      try {
        const geoRes = await geoCoordinates(
          `${form.address}, ${form.city}, ${form.department}, Colombia`,
        );
        console.log("geoRes:", geoRes);
        if (geoRes.success) {
          location = geoRes.coordinates;
        }
      } catch {
        console.warn("No se pudo geocalizar la direccion");
      }
    }
    console.log("Location a guardar:", location);

    // Guardar datos en Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: form.name,
      email: form.email,
      phone: form.phone,
      department: form.department || null,
      city: form.city,
      role: "worker",

      workerData: {
        category: form.category,
        exp: form.exp,
        hasLocal: form.hasLocal,
        address: form.address,
        isAvailable: true,
        location: location,

        verification: {
          typeId: form.type_id,
          idNumber: form.id_number,
          status: "pending",
          veriedAt: null,
        }
      },

      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error registrando worker:", error);
    return { success: false, message: error.message };
  }
};
