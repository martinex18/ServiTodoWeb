import { db } from "@/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";

export const createRequest = async (form) => {
  try {
    const docRef = await addDoc(collection(db, "requests"), {
      clientId: form.clientId,
      clientName: form.clientName,
      //clientCity: form.clientCity,
      clientPhone: form.clientPhone,

      serviceCategory: form.serviceCategory,
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
    return { success: false, message: firebaseErrorMessage(error.code) };
  }
};