import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const findWorker = async (category) => {
    try {
        const q = query(
            collection(db, "users"),
            where("role", "==", "worker"),
            where("workerData.category", "==", category),
            where("workerData.isAvailable", "==", true),
        );

        const snapshot = await getDocs(q);

        if(snapshot.empty) {
            return { success: false, message: "No se encontraron trabajadores disponibles en esta categoría." };
        }

        const workers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { success: true, workers };
    } catch (error) {
        console.log("Error al buscar worker:", error);
        return { success: false, message: "Ocurrió un error al buscar trabajadores. Por favor, intenta nuevamente." };
    }
};