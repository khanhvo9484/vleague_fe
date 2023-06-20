import notFoundImage from "../../../assets/notfound.jpg";
import useProgressiveImage from "../../../hooks/useProgressiveImage";
import { Box } from "@mui/material";
import DefaultLayout from "../../../layout/DefaultLayout";
const Unauthorized = () => {
  const loadedBG = useProgressiveImage(notFoundImage);
  return (
    <DefaultLayout>
      <Box sx={{}}>
        <img style={{ maxWidth: "50vw" }} src={loadedBG}></img>
      </Box>
    </DefaultLayout>
  );
};

export default Unauthorized;
