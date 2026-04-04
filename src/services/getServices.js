import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getServices = async () => {
  try {
    const servicesQuery = query(collection(db, "services"));

    const snapshot = await getDocs(servicesQuery);
    const services = snapshot.docs.map((serv) => ({
      id: serv.id,
      ...serv.data(),
    }));
    return { success: true, services };
  } catch (error) {
    console.error("Error obteniendo servicios para el customer: ", error);
    return { success: false, message: error.message };
  }
};
