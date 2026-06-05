export const sendRequestNotification = async (workerPhone, category, description, address) => {
    try {
        const response = await fetch("http://localhost:3001/api/whatsapp/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: workerPhone,
                message: `🔔 *Nueva solicitud - ServiTodo*

📌 *Servicio:* ${category}

📝 *Descripción:* ${description ? `📝 *Descripción:*\n${description}\n` : ""}

📍 *Dirección:* ${address ? `📍 *Dirección:*\n${address}\n` : ""}`,
            }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error enviando notificación de solicitud:", error);
        return { success: false, message: error.message };
    }
}