import { db } from "@/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const createRequest = async (form) => {
  try {
    const docRef = await addDoc(collection(db, "requests"), {
      clientId: form.clientId,
      clientName: form.clientName,
      clientCity: form.clientCity,
      clientPhone: form.clientPhone,

      serviceDescription: form.serviceDescription,
      serviceAddress: form.serviceAddress,
      serviceDate: form.serviceDate,
      
      requestType: "direct",

      workerId: null,

      status: "searching",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creando la solicitud: ", error);
    return { success: false, message: error.message };
  }
};