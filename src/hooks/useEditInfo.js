import EditInfoContext from "../context/EditInfoContext";
import { useContext } from "react";

const useCurrentLeague = () => {
  const {
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
  };
};
export default useCurrentLeague;
