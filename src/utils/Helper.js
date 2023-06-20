import { format, parse } from "date-fns";
function formatDateToLocal(dateString) {
  try {
    const parts = dateString.split("-");
    const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    return format(formattedDate, "dd/MM/yyyy");
  } catch (err) {
    return dateString;
  }
}
function formatDateToUTC(dateString) {
  try {
    const parts = dateString.split("/");
    const formattedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return format(formattedDate, "yyyy-MM-dd");
  } catch (err) {
    return dateString;
  }
}
// Export the helper function
export default {
  formatDateToLocal,
  formatDateToUTC,
};
