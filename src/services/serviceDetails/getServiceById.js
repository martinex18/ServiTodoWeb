import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getServiceById = async (id) => {
  try {
    const serviceRef = doc(db, "services", id);
    const serviceSnap = await getDoc(serviceRef);

    if (!serviceSnap.exists()) {
      return { success: false, message: "Servicio no encontrado" };
    }

    return {
      success: true,
      services: { id: serviceSnap.id, ...serviceSnap.data() },
    };
  } catch (error) {
    console.error("Error obteniendo servicio por ID", error);
    return { success: false, message: error.message };
  }
};
