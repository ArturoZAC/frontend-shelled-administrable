export const getGreeting = () => {
  const nowUTC = new Date();
  const hour = nowUTC.getHours();

  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenos tardes";
  return "Buenas noches";
};
