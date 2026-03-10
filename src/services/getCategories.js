import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";

const db = getFirestore(app);

export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, categories: categories };
  } catch (error) {
    console.error("Error obteniendo categorias: ", error);
    return { success: false, message: error.message };
  }
};
