import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

export const registerServices = async (form) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, message: "Usuario no autenticado" };
    }

    await addDoc(collection(db, "services"), {
      user_id: user.uid,
      name: form.name,
      category: form.category,
      description: form.description,
      type: form.type,
      price: form.price,
      available: true,
      created_at: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.log("Error registrando un servicio: ", error);
    return { success: false, message: error.message };
  }
};
