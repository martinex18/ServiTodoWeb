import {
    setDoc, getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const loginClient = async (confirmation, code) => {
    try {
        const result = await confirmation.confirm(code);
        const client = result.user;

        const clientRef = doc(db, "users", client.uid);
        const clientSnap = await getDoc(clientRef);

        if (!clientSnap.exists()) {
            await setDoc(clientRef, {
                phone: client.phoneNumber,
                role: "client",
                isVerified: true,
                profileCompleted: false,
                createdAt: serverTimestamp(),
            });
        }

        const updatedClientSnap = await getDoc(clientRef);

        return {
            success: true,
            role: 'client',
            user: { uid: client.uid, ...updatedClientSnap.data() },
        };
    } catch (error) {
        return {
            success: false,
            message: "Código inválido",
        };
    }
}