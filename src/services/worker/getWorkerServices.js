import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getWorkerServices = async (uid) => {
  try {
    const servicesQuery = query(
      collection(db, "services"),
      where("user_id", "==", uid),
    );
    const snapshot = await getDocs(servicesQuery);

    const services = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, services };
  } catch (error) {
    console.log("Error obteniendo servicios", error);
    return { success: false, message: error.message };
  }
};
