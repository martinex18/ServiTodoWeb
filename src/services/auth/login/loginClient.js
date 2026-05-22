import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const loginClient = async (confirmationResult, code, form) => {
    try {
        const result = await confirmationResult.confirm(code);
        const client = result.user;

        const clientRef = doc(db, "users", client.uid);
        const clientSnap = await getDoc(clientRef);

        if (!clientSnap.exists()) {
            await setDoc(clientRef, {
                name: form.name,
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
        console.error("Error verificando OTP:", error);
        return {
            success: false,
            message: "Código inválido",
        };
    }
}