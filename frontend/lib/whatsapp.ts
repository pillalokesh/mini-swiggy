export const buildWhatsAppUrl = (number: string, message: string) => {
  const cleaned = number.replace(/\D/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
};
