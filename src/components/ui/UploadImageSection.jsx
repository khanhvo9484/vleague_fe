import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { defaultImage } from "../../data/GlobalConstant";
import { storage } from "../../firebase/FirebaseConfig";
import { getDownloadURL, ref as refs, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import useEditInfo from "../../hooks/useEditInfo";
import { set } from "date-fns";
const UploadImageSection = () => {
  const {
    isFireUpload,
    setIsUploadingImage,
    setImageUrl,
    imageUrl,
    setHasImageOnQueue,
  } = useEditInfo();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      console.log("I added to queue");
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
        console.log("I upload");
        const imageRef = refs(storage, `${image.name} ${v4()}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        setImageUrl(url);
        console.log(url);
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
        <img
          style={{ width: "200px" }}
          src={selectedImage || defaultImage.image}
          alt="Selected Image"
        />
      </Box>
      <Box textAlign={"center"}>
        <Button component="label" startIcon={<AddPhotoAlternate />}>
          <input
            type="file"
            hidden
            onChange={handleImageChange}
            accept="image/*"
          />
          Tải lên ảnh
        </Button>
      </Box>
    </Box>
  );
};

export default UploadImageSection;
