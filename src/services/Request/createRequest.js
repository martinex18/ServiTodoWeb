import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";
const API_URL = import.meta.env.VITE_API_URL;

export const createRequest = async (form) => {
  try {
    const response = await fetch (
      `${API_URL}/api/requests/create`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    return await response.json();

  } catch (error) {
    console.error("Error creando la solicitud: ", error);
    return { success: false, message: firebaseErrorMessage(error.code) };
  }
};