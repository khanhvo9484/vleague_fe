import { Dialog, Backdrop, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Rules from "../../../components/ui/rules/Rules";
import PlayerRuleOnly from "../../../components/ui/rules/PlayerRuleOnly";
const PopupRules = (props) => {
  const { currentLeague, isOpen, setIsOpen, currentRegisterListInfo } = props;
  const [maxPlayer, setMaxPlayer] = useState(-1);
  const [maxForeignPlayer, setMaxForeignPlayer] = useState(-1);
  const [maxAge, setMaxAge] = useState(-1);
  const [minAge, setMinAge] = useState(-1);
  const [minPlayer, setMinPlayer] = useState(-1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [winPoint, setWinPoint] = useState(-1);
  const [drawPoint, setDrawPoint] = useState(-1);
  const [losePoint, setLosePoint] = useState(-1);
  const [numberOfClubs, setNumberOfClubs] = useState(-1);
  const [notificationContent, setNotificationContent] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsEditable(false);
    if (currentLeague) {
      setMaxPlayer(currentLeague?.quyDinhCauThu?.soLuongCauThuToiDa);
      setMinPlayer(currentLeague?.quyDinhCauThu?.soLuongCauThuToiThieu);
      setMaxForeignPlayer(
        currentLeague?.quyDinhCauThu?.soLuongCauThuNuocNgoaiToiDa
      );
      setMaxAge(currentLeague?.quyDinhCauThu?.tuoiToiDa);
      setMinAge(currentLeague?.quyDinhCauThu?.tuoiToiThieu);
      setWinPoint(currentLeague?.quyDinhTinhDiem?.thang);
      setDrawPoint(currentLeague?.quyDinhTinhDiem?.hoa);
      setLosePoint(currentLeague?.quyDinhTinhDiem?.thua);
      setNumberOfClubs(currentLeague?.quyDinhSoLuongDoi?.soLuongDoi);
    } else {
      setMaxPlayer(-1);
      setMinPlayer(-1);
      setMaxForeignPlayer(-1);
      setMaxAge(-1);
      setMinAge(-1);
      setWinPoint(-1);
      setDrawPoint(-1);
      setLosePoint(-1);
      setNumberOfClubs(-1);
    }
  }, [currentLeague]);

  return (
    <>
      {currentLeague && (
        <Box
          sx={{
            backgroundColor: "background.paper",
            opacity: "1",
            width: "100%",
            borderRadius: "4px",
          }}
        >
          <PlayerRuleOnly
            maxPlayer={maxPlayer}
            setMaxPlayer={setMaxPlayer}
            minPlayer={minPlayer}
            setMinPlayer={setMinPlayer}
            maxForeignPlayer={maxForeignPlayer}
            setMaxForeignPlayer={setMaxForeignPlayer}
            minAge={minAge}
            maxAge={maxAge}
            setMinAge={setMinAge}
            setMaxAge={setMaxAge}
            winPoint={winPoint}
            drawPoint={drawPoint}
            losePoint={losePoint}
            isEditable={isEditable}
            numberOfClubs={numberOfClubs}
            setNumberOfClubs={setNumberOfClubs}
            notTextField={true}
            currentRegisterListInfo={currentRegisterListInfo}
          ></PlayerRuleOnly>
        </Box>
      )}
    </>
  );
};

export default PopupRules;
