import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const getWorkersById = async (id) => {
  try {
    const docRef = doc(db, "worker", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { success: true, worker: { id: snapshot.id, ...snapshot.data() } };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error obteniendo workers por id: ", error);
  }
};
