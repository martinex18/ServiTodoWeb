export const normalizeAddress = (address) => {
  let normalized = address.toLowerCase().trim();

  // Abreviaciones de vía
  normalized = normalized
    .replace(/\bcra\b/g, "carrera")
    .replace(/\bcr\b/g, "carrera")
    .replace(/\bcl\b/g, "calle")
    .replace(/\bcll\b/g, "calle")
    .replace(/\bav\b/g, "avenida")
    .replace(/\bavda\b/g, "avenida")
    .replace(/\bdiag\b/g, "diagonal")
    .replace(/\btrans\b/g, "transversal")
    .replace(/\btr\b/g, "transversal")
    .replace(/\bcir\b/g, "circular")
    .replace(/\bkm\b/g, "kilometro");

  // Separadores de número — reemplaza # o n. por espacio
  normalized = normalized
    .replace(/#/g, " ")
    .replace(/\bn\./g, " ")
    .replace(/-/g, " ");

  // Limpiar espacios múltiples
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
};
