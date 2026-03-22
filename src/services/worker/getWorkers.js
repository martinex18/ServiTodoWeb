import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getWorkers = async () => {
  try {
    const snapshot = await getDocs(collection(db, "worker"));
    const workers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, workers };
  } catch (error) {
    console.error("Error obtenido en workers: ", error);
    return { success: false, message: error.message };
  }
};
