export const formatMsatsToSats = (msats: string) => {
  if (!msats) return 0;
  return parseInt(msats) / 1000;
};
