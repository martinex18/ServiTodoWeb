import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";
import { findWorker } from "../worker/findWorker";
import { sendRequestNotification } from "../whatsapp/sendRequestNotification";

export const createRequest = async (form) => {
  try {
    const docRef = await addDoc(collection(db, "requests"), {
      clientId: form.clientId,
      clientName: form.clientName,
      clientPhone: form.clientPhone,

      serviceCategory: form.serviceCategory,
      serviceDescription: form.serviceDescription,
      serviceAddress: form.serviceAddress,
      serviceDate: form.serviceDate,

      requestType: "direct",

      workerId: null,
      workerName: null,
      workerPhone: null,

      status: "searching",

      assignedAt: null,
      completedAt: null,
      cancelledAt: null,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const requestId = docRef.id;

    const result = await findWorker(form.serviceCategory);

    if (result.success && result.workers.length > 0) {
      const worker = result.workers[0];

      await updateDoc(doc(db, "requests", requestId), {
        workerId: worker.id,
        status: "pre_assigned",
        updatedAt: serverTimestamp(),
      });

      await sendRequestNotification(
        `+57${worker.phone}`,
        form.serviceCategory,
        form.serviceDescription,
        form.serviceAddress,
      );
    }

    return { success: true, id: requestId };
  } catch (error) {
    console.error("Error creando la solicitud: ", error);
    return { success: false, message: firebaseErrorMessage(error.code) };
  }
};