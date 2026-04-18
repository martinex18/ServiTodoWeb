import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const updateRequest = async (requestId, status) => {
  try {
    const ref = doc(db, "requests", requestId);

    await updateDoc(ref, {
      status,
    });

    return { success: true };
  } catch (error) {
    console.error("Error actualizando la solicitud: ", error);
    return { success: false, message: error.message };
  }
};
