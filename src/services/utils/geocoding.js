import { normalizeAddress } from "./normalizeAddress";

export const geoCoordinates = async (address) => {
  try {
    const normalized = normalizeAddress(address);
    const encoded = encodeURIComponent(normalized);
    console.log("Dirección normalizada:", normalized);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`,
      {
        headers: {
          "Accept-Language": "es",
          "User-Agent": "ServiTodo/1.0",
        },
      },
    );

    const data = await response.json();

    if (data.length === 0) {
      return { success: false, message: "Direccion no encontrada" };
    }

    return {
      success: true,
      coordinates: {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      },
    };
  } catch (error) {
    console.error("Error obteniendo direccion: ", error);
    return { success: false, message: error.message };
  }
};
