import { db } from "@/firebaseConfig"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"

export const cancelRequest = async (requestId) => {
    try {
        await updateDoc(doc(db, "requests", requestId), {
            status: "Canceled",
            canceledAt: serverTimestamp(),
        });
        return {success: true};
    } catch (error) {
        console.error("Error cancelando solicitud: ", error);
        return {success: false, message: "Error al cancelar la solicitud."};
    }
}