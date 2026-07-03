const API_URL = import.meta.env.VITE_API_URL;

export const sendRequestNotification = async (workerPhone, category, description, address) => {
    try {
        const response = await fetch(`${API_URL}/api/whatsapp/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                workerPhone,
                category,
                description,
                address,
            }),
        });
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message,
            };
        }

        return data;
    } catch (error) {
        console.error("Error enviando notificación de solicitud:", error);
        return { success: false, message: error.message };
    }
}