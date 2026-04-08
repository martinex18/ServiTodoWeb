import { getToken } from "firebase/messaging";
import { messaging } from "@/firebaseConfig";
import { updateWorkerToken } from "../worker/updateWorkerToken";

export async function requestNotification(uid) {
  try {
    console.log("VAPID key:", import.meta.env.VITE_FIREBASE_VAPID_KEY);
    // verificar si ya existe el permiso
    if (Notification.permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      // actualiza el token
      if (token) await updateWorkerToken(uid, token);
      return { status: "granted", token };
    }

    // pedir permiso al usuario
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) await updateWorkerToken(uid, token);
      return { status: "granted", token };
    }

    return { status: "denied", token: null };
  } catch (error) {
    console.log("Error obteniendo el token:", error);
    return { status: "error", message: error.message };
  }
}
