import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getTypeId = async () => {
  const cache = sessionStorage.getItem("typeID");
  if (cache) return { success: true, typeID: JSON.parse(cache) };

  try {
    const idQuery = query(collection(db, "typeID"), orderBy("name", "asc"));
    const snapshot = await getDocs(idQuery);
    const typeId = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    sessionStorage.setItem("typeID", JSON.stringify(typeId));
    return { success: true, typeID: typeId };
  } catch (error) {
    console.error("Error obteniendo los tipos de identificacion: ", error);
    return { success: false, message: error.message };
  }
};
