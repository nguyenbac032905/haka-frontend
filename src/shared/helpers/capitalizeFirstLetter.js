export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string") return "";
  const s = str.trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
};