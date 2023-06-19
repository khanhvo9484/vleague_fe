import CurrentLeagueContext from "../context/CurrentLeagueContext";
import { useContext } from "react";

const useCurrentLeague = () => {
  const {
    currentLeague,
    setCurrentLeague,
    // Current league
    currentSchedule,
    setCurrentSchedule,
    //current schedule
    currentMatchDay,
    setCurrentMatchDay,
    // current match day
    currentPlayer,
    setCurrentPlayer,
    // current player
    currentClub,
    setCurrentClub,
    // current club
    currentStadium,
    setCurrentStadium,
    // current stadium
    currentManager,
    setCurrentManager,
    // current manager
  } = useContext(CurrentLeagueContext);

  return {
    currentLeague,
    setCurrentLeague,
    currentSchedule,
    setCurrentSchedule,
    currentMatchDay,
    setCurrentMatchDay,
    currentPlayer,
    setCurrentPlayer,
    currentClub,
    setCurrentClub,
    currentStadium,
    setCurrentStadium,
    currentManager,
    setCurrentManager,
  };
};
export default useCurrentLeague;
