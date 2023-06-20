import unauthorizedImage from "../../../assets/unauthorized.jpg";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import { Box } from "@mui/material";
import DefaultLayout from "../../../layout/DefaultLayout";
const Unauthorized = () => {
  const loadedBG = useProgressiveImage(unauthorizedImage);
  return (
    <DefaultLayout>
      <Box sx={{}}>
        <img style={{ maxWidth: "50vw" }} src={loadedBG}></img>
      </Box>
    </DefaultLayout>
  );
};

export default Unauthorized;
