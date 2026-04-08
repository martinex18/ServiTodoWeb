import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const createRequest = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "requests"), {
      service_id: data.service_id,
      service_name: data.service_name,
      worker_id: data.worker_id,
      client_id: data.client_id,
      client_name: data.client_name,
      client_phone: data.client_phone,
      date: data.date,
      time: data.time,
      address: data.address,
      notes: data.notes || "",
      status: "pending",
      created_at: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creando la solicitud: ", error);
    return { success: false, message: error.message };
  }
};
