import { createContext } from "react";
import { useState } from "react";

const EditClubContext = createContext({});
export const EditClubProvider = ({ children }) => {
  const [currentStadium, setCurrentStadium] = useState();
  const [currentClub, setCurrentClub] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isFireUpload, setIsFireUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [hasImageOnQueue, setHasImageOnQueue] = useState(false);
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
      }}
    >
      {children}
    </EditClubContext.Provider>
  );
};
export default EditClubContext;
