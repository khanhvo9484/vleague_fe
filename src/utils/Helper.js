function formatDateToLocal(dateString) {
  console.log(dateString);
  const parts = dateString.split("-");
  const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
  console.log(formattedDate.toLocaleDateString());
  return formattedDate.toLocaleDateString();
}

// Export the helper function
export default {
  formatDateToLocal,
};
