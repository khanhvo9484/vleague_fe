// import { useState, useEffect } from "react";
// import { Paper, Box, Typography, CircularProgress } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// const useStyles = makeStyles((theme) => ({}));

// const LinearList = (props) => {
//   const { listItem } = props.listItem;
//   const classes = useStyles();

//   return (
//     <Box>
//       <TextField
//         {...params}
//         size="small"
//         value={searchValue}
//         onChange={handleSearchChange}
//         placeholder="Tìm kiếm cầu thủ, đội bóng,..."
//         sx={{
//           "& fieldset": { border: "none" },
//         }}
//         InputProps={{
//           ...params.InputProps,
//           startAdornment: (
//             <InputAdornment position="start">
//               <IconButton
//                 size="small"
//                 edge="start"
//                 onClick={handleClearSearch}
//                 style={{ cursor: "pointer" }}
//                 sx={{
//                   "&:hover": { bgcolor: "primary.light" },
//                 }}
//               >
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <>
//               {isLoading ? (
//                 <CircularProgress color="inherit" size={20} />
//               ) : null}
//               {params.InputProps.endAdornment}
//             </>
//           ),
//         }}
//       />
//     </Box>
//   );
// };
// export default LinearList;
