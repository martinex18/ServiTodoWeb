import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCategories = async () => {
  const cache = sessionStorage.getItem("categories");
  if (cache) return { success: true, categories: JSON.parse(cache) };

  try {
    const categoriesQuery = query(
      collection(db, "categories"),
      orderBy("name", "asc"),
    );
    const snapshot = await getDocs(categoriesQuery);
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    sessionStorage.setItem("categories", JSON.stringify(categories));
    return { success: true, categories };
  } catch (error) {
    console.error("Error obteniendo categorias: ", error);
    return { success: false, message: error.message };
  }
};
