// import {
//   Paper,
//   Grid,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Autocomplete,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import { Remove } from "@mui/icons-material";

// const AddGoalCard = (props) => {
//   const goalType = [
//     {
//       id: 1,
//       mota: "Penalty",
//       ten: "Penalty",
//     },
//     {
//       id: 2,
//       mota: "Bàn thắng thông thường",
//       ten: "Bình thường",
//     },
//   ];
//   const { homeTeam, awayTeam } = props;
//   return (
//     <Paper key={goalPaper.length} elevation={3} sx={{ padding: "1rem" }}>
//       {" "}
//       <Grid container justifyContent={"space-between"}>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="h6">{homeTeam?.ten}</Typography>
//           </Box>
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "space-between",
//               mt: "0.5rem ",
//             }}
//           >
//             <Autocomplete
//               sx={{ width: "40%" }}
//               getOptionLabel={(option) => option.hoTen}
//               options={homeTeam?.danhSachCauThuDangThiDau}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Chọn cầu thủ"
//                   inputProps={{
//                     ...params.inputProps,
//                   }}
//                 />
//               )}
//             ></Autocomplete>
//             <Autocomplete
//               sx={{ width: "40%" }}
//               getOptionLabel={(option) => option.hoTen}
//               options={homeTeam?.danhSachCauThuDangThiDau}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Chọn cầu thủ"
//                   inputProps={{
//                     ...params.inputProps,
//                   }}
//                 />
//               )}
//             ></Autocomplete>
//             <Box sx={{}}>
//               <TextField
//                 sx={{ width: "40%" }}
//                 label="Thời điểm ghi bàn"
//               ></TextField>
//             </Box>
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography>{awayTeam?.ten}</Typography>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default AddGoalCard;
