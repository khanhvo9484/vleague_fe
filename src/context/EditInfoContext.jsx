import { createContext } from "react";
import { useState } from "react";

const EditClubContext = createContext({});
export const EditClubProvider = ({ children }) => {
  const [currentStadium, setCurrentStadium] = useState();
  const [currentClub, setCurrentClub] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isFireUpload, setIsFireUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [hasImageOnQueue, setHasImageOnQueue] = useState(false);
  const [openNotiBox, setOpenNotiBox] = useState(false);
  const [isAccept, setIsAccept] = useState("");
  const resetImage = () => {
    setImageUrl("");
    setIsUploadingImage(false);
    setHasImageOnQueue(false);
    setIsFireUpload(false);
  };
  const resetAll = () => {
    setCurrentStadium();
    setCurrentClub();
    setIsEditable(false);
    setIsFireUpload("");
    setImageUrl("");
    setIsUploadingImage(false);
    setHasImageOnQueue(false);
    setOpenNotiBox(false);
    setIsAccept("");
  };
  return (
    <EditClubContext.Provider
      value={{
        currentStadium,
        setCurrentStadium,
        currentClub,
        setCurrentClub,
        isEditable,
        setIsEditable,
        isFireUpload,
        setIsFireUpload,
        imageUrl,
        setImageUrl,
        isUploadingImage,
        setIsUploadingImage,
        hasImageOnQueue,
        setHasImageOnQueue,
        openNotiBox,
        setOpenNotiBox,
        isAccept,
        setIsAccept,
        resetImage,
        resetAll,
      }}
    >
      {children}
    </EditClubContext.Provider>
  );
};
export default EditClubContext;
