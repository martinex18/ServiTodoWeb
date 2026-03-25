import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getTypeId = async () => {
  try {
    const snapshot = await getDocs(collection(db, "typeID"));
    const typeId = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, typeID: typeId };
  } catch (error) {
    console.error("Error obteniendo los tipos de identificacion: ", error);
    return { success: false, message: error.message };
  }
};
