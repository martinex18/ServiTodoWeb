import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const updateWorkerToken = async (uid, token) => {
  try {
    await updateDoc(doc(db, "worker", uid), {
      fcmToken: token,
    });

    return { success: true };
  } catch (error) {
    console.error("Error actualizando el token del worker: ", error);
    return { success: false, message: error.message };
  }
};
