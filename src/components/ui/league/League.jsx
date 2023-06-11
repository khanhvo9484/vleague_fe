// import React from "react";
// import { makeStyles } from "@mui/styles";
// import { Paper, List, ListItem, Box, Typography } from "@mui/material";
// import { useState, useEffect } from "react";
// import MyAxios from "../../../api/MyAxios";
// import teamLogo from "../../../data/GlobalConstant";
// import Helper from "../../../utils/Helper";
// import { CircularProgress } from "@mui/material";
// const useStyles = makeStyles((theme) => ({
//   boxTitle: {
//     color: theme.palette.primary.main,
//     bgcolor: "white",
//     overflow: "hidden",
//     borderRadius: "4px 4px 0 0",
//     textAlign: "center",
//     padding: "1rem",
//     boxShadow: 3,
//     border: "2px solid black",
//   },
//   leagueCard: {
//     maxWidth: "500px",
//     opacity: 0.9,
//     boxShadow: 2,
//     // marginLeft: "3rem",
//     marginTop: "2rem",
//   },
//   leagueItem: {
//     display: "flex",
//     border: "1px solid black",
//     cursor: "pointer",
//     minHeight: "80px",
//     width: "100%",
//     // minWidth: "400px",
//   },
//   evenItem: {
//     backgroundColor: theme.palette.secondary.main,
//     "&:hover": {
//       backgroundColor: "green",
//     },
//   },
//   oddItem: {
//     backgroundColor: theme.palette.secondary.light,
//     "&:hover": {
//       backgroundColor: "green",
//     },
//   },
// }));
// const League = () => {
//   const classes = useStyles();
//   const [isLoading, setIsLoading] = useState(false);
//   const [listItem, setListItem] = useState([]);

//   useEffect(async () => {
//     try {
//       setIsLoading(true);
//       const response = await MyAxios.get("/muagiai", {
//         params: { page: 1, limit: 100 },
//       });
//       console.log(response);
//       if (response.status === 200) {
//         if (response?.data?.data?.listResult) {
//           setListItem(response.data.data.listResult);
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
//   return (
//     <>
//       <Paper elevation={3} sx={{ }}>
//         <Typography variant="h3">Mùa giải hiện tại</Typography>

//         <List sx={{ padding: 0 }}>
//           {isLoading ? (
//             <Box
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "40vh",
//               }}
//             >
//               <CircularProgress />
//             </Box>
//           ) : null}
//           {!isLoading &&
//             listItem.map((item, index) => {
//               const isEven = index % 2 === 0;
//               const itemClass = isEven ? classes.evenItem : classes.oddItem;
//               return (
//                 <ListItem
//                   onClick={() => handleSelectTour(item.id)}
//                   key={item.id}
//                   className={`${classes.leagueItem} ${itemClass} `}
//                   sx={{
//                     borderRadius:
//                       index === listItem.length - 1 ? "0 0 4px 4px" : "0",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Typography variant="h5">{item.id}. </Typography>
//                     <img
//                       style={{ width: "35px", marginRight: "0.5rem" }}
//                       src={teamLogo?.logo1}
//                     ></img>
//                     <Typography variant="h5">{item.ten}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex" }}>
//                     <Typography variant="body1">
//                       {Helper.formatDateToLocal(item.thoiDiemBatDau)} -
//                       {Helper.formatDateToLocal(item.thoiDiemBatDau)}
//                     </Typography>
//                   </Box>
//                 </ListItem>
//               );
//             })}
//         </List>
//       </Paper>
//     </>
//   );
// };

// export default League;

// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/styles";
// import { Paper, List, ListItem, Box, Typography, Button } from "@mui/material";
// import MyAxios from "../../../api/MyAxios";
// import teamLogo from "../../../data/GlobalConstant";
// import Helper from "../../../utils/Helper";
// import { CircularProgress } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   // Your existing styles...
//   listItem: {
//     transition: "opacity 0.5s linear",
//   },
// }));

// const League = () => {
//   const classes = useStyles();
//   const [isLoading, setIsLoading] = useState(false);
//   const [listItem, setListItem] = useState([]);
//   const [visibleItems, setVisibleItems] = useState(4);

//   useEffect(() => {
//     const fetchListItems = async () => {
//       try {
//         setIsLoading(true);
//         const response = await MyAxios.get("/muagiai", {
//           params: { page: 1, limit: 100 },
//         });
//         if (response.status === 200 && response?.data?.data?.listResult) {
//           setListItem(response.data.data.listResult);
//         }
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchListItems();
//   }, []);

//   const handleShowMore = () => {
//     setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
//   };

//   return (
//     <Paper elevation={3}>
//       <Typography variant="h3">Mùa giải hiện tại</Typography>
//       <List>
//         {isLoading ? (
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "40vh",
//             }}
//           >
//             <CircularProgress />
//           </Box>
//         ) : null}
//         {!isLoading &&
//           listItem.slice(visibleItems - 4, visibleItems).map((item, index) => {
//             const isEven = index % 2 === 0;
//             const itemClass = isEven ? classes.evenItem : classes.oddItem;
//             const itemStyle = {
//               opacity: index < visibleItems ? 1 : 0,
//               transitionDelay: `${index * 0.2}s`,
//             };
//             return (
//               <ListItem
//                 key={item.id}
//                 className={`${classes.leagueItem} ${itemClass} ${classes.listItem} `}
//                 sx={{
//                   borderRadius:
//                     index === listItem.length - 1 ? "0 0 4px 4px" : "0",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   ...itemStyle,
//                 }}
//               >
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Typography variant="h5">{item.id}. </Typography>
//                   <img
//                     style={{ width: "35px", marginRight: "0.5rem" }}
//                     src={teamLogo?.logo1}
//                     alt=""
//                   ></img>
//                   <Typography variant="h5">{item.ten}</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex" }}>
//                   <Typography variant="body1">
//                     {Helper.formatDateToLocal(item.thoiDiemBatDau)} -
//                     {Helper.formatDateToLocal(item.thoiDiemBatDau)}
//                   </Typography>
//                 </Box>
//               </ListItem>
//             );
//           })}
//       </List>
//       {
//         <Box sx={{ textAlign: "center" }}>
//           <Button variant="contained" onClick={handleShowMore}>
//             Show More
//           </Button>
//         </Box>
//       }
//     </Paper>
//   );
// };

// export default League;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, List, ListItem, Box, Typography, Button } from "@mui/material";
import MyAxios from "../../../api/MyAxios";
import teamLogo from "../../../data/GlobalConstant";
import Helper from "../../../utils/Helper";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  // Your existing styles...
  listItem: {
    opacity: 0,
    transition: "opacity 0.3s linear",
  },
}));

const League = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        setIsLoading(true);
        const response = await MyAxios.get("/muagiai", {
          params: { page: 1, limit: 100 },
        });
        if (response.status === 200 && response?.data?.data?.listResult) {
          setListItem(response.data.data.listResult);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListItems();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setVisibleItems((prevVisibleItems) =>
          prevVisibleItems < listItem.length
            ? prevVisibleItems + 1
            : prevVisibleItems
        );
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [visibleItems, isLoading, listItem.length]);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) =>
      Math.min(prevVisibleItems + 4, listItem.length)
    );
  };

  return (
    <Paper elevation={3}>
      <Typography variant="h3">Mùa giải hiện tại</Typography>
      <List>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "40vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
        {!isLoading &&
          listItem.map((item, index) => {
            const isEven = index % 2 === 0;
            const itemClass = isEven ? classes.evenItem : classes.oddItem;
            const itemStyle = {
              opacity: index < visibleItems ? 1 : 0,
              transitionDelay: `${index * 0.1}s`,
            };
            return (
              <ListItem
                key={item.id}
                className={`${classes.leagueItem} ${itemClass} ${classes.listItem}`}
                sx={{
                  borderRadius:
                    index === listItem.length - 1 ? "0 0 4px 4px" : "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  ...itemStyle,
                }}
              >
                {/* ... Render item content here */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5">{item.id}. </Typography>
                  <img
                    style={{ width: "35px", marginRight: "0.5rem" }}
                    src={teamLogo?.logo1}
                    alt=""
                  ></img>
                  <Typography variant="h5">{item.ten}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body1">
                    {Helper.formatDateToLocal(item.thoiDiemBatDau)} -
                    {Helper.formatDateToLocal(item.thoiDiemBatDau)}
                  </Typography>
                </Box>
              </ListItem>
            );
          })}
      </List>
      {listItem.length > visibleItems && (
        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default League;
