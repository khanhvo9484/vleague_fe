import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { defaultImage } from "../../data/GlobalConstant";
import { storage } from "../../firebase/FirebaseConfig";
import { getDownloadURL, ref as refs, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import useEditInfo from "../../hooks/useEditInfo";
const UploadImageSection = () => {
  const { setImageUrl, setHasImageOnQueue, isFireUpload, imageUrl } =
    useEditInfo();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setHasImageOnQueue(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isFireUpload) {
      handleImageUpload();
    }
  }, [isFireUpload]);

  const handleImageUpload = async () => {
    const image = selectedImageFile;
    if (image) {
      try {
        const imageRef = refs(storage, `${image.name} ${v4()}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        setImageUrl(url);
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (imageUrl) {
      setHasImageOnQueue(false);
    }
  }, [imageUrl]);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
    >
      <Box textAlign={"center"}>
        <Button
          component="label"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="file"
            hidden
            onChange={handleImageChange}
            accept="image/*"
          />
          <Box textAlign={"center"}>
            <img
              style={{
                width: "200px",
                borderRadius: "4px",
                maxHeight: "200px",
              }}
              src={selectedImage || defaultImage.image}
              alt="Selected Image"
            />
          </Box>
        </Button>
        <TextField
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
          placeholder="Nhập link hình ảnh"
          size="small"
          sx={{
            input: { color: "primary.main", backgroundColor: "white" },
          }}
          value={imageUrl}
        ></TextField>
      </Box>
    </Box>
  );
};

export default UploadImageSection;
