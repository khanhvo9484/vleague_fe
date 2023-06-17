import CurrentLeagueContext from "../context/CurrentLeagueContext";
import { useContext } from "react";

const useCurrentLeague = () => {
  const {
    currentLeague,
    setCurrentLeague,
    currentSchedule,
    setCurrentSchedule,
    currentMatchDay,
    setCurrentMatchDay,
  } = useContext(CurrentLeagueContext);

  return {
    currentLeague,
    setCurrentLeague,
    currentSchedule,
    setCurrentSchedule,
    currentMatchDay,
    setCurrentMatchDay,
  };
};
export default useCurrentLeague;
