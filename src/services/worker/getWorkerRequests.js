import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getWorkerRequests = async (uid) => {
  try {
    const requestsQuery = query(
      collection(db, "requests"),
      where("worker_id", "==", uid),
    );

    const snapshot = await getDocs(requestsQuery);
    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, requests };
  } catch (error) {
    console.error("Error obteniendo solicitudes: ", error);
    return { success: false, message: error.message };
  }
};
