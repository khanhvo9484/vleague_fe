import { format } from "date-fns";
function formatDateToLocal(dateString) {
  try {
    const parts = dateString.split("-");
    const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    return format(formattedDate, "dd/MM/yyyy");
  } catch (err) {
    return dateString;
  }
}

// Export the helper function
export default {
  formatDateToLocal,
};
