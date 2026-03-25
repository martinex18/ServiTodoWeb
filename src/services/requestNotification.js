import { getToken } from 'firebase/messaging';
import { messaging } from '@/firebaseConfig';

export async function requestNotification() {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.log('Notification permission not granted.');
            return null;
        }

        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (token) {
            console.log('Notification token obtained:', token);
            return token;
        } else {
            console.log('No notification token obtained.');
            return null;
        }


    } catch (error) {
        console.log('Error obtaining notification token:', error);
        return null;
    }
}