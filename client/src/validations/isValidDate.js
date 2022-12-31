export default function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  const age = Date.now() - date.getTime();
  const ageInYears = age / (1000 * 60 * 60 * 24 * 365.25);
  return date.getDate() === day && ageInYears >= 18;
}
