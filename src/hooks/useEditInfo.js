import EditInfoContext from "../context/EditInfoContext";
import { useContext } from "react";

const useCurrentLeague = () => {
  const {
    setCurrentStadium,
    setCurrentClub,
    // set currentStadium,
    currentStadium,
    currentClub,
    // Edit section
    isEditable,
    setIsEditable,
    // End edit section
    // Image section
    isFireUpload,
    setIsFireUpload,
    imageUrl,
    setImageUrl,
    isUploadingImage,
    setIsUploadingImage,
    hasImageOnQueue,
    setHasImageOnQueue,
    resetImage,
    // End image section
    openNotiBox,
    setOpenNotiBox,
    isAccept,
    setIsAccept,
    resetAll,
  } = useContext(EditInfoContext);

  return {
    setCurrentStadium,
    setCurrentClub,
    currentStadium,
    currentClub,
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
  };
};
export default useCurrentLeague;
