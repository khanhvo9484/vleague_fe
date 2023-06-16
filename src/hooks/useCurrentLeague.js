import CurrentLeagueContext from "../context/CurrentLeagueContext";
import { useContext } from "react";

const useCurrentLeague = () => {
  const {
    currentLeague,
    setCurrentLeague,
    currentSchedule,
    setCurrentSchedule,
  } = useContext(CurrentLeagueContext);

  return {
    currentLeague,
    setCurrentLeague,
    currentSchedule,
    setCurrentSchedule,
  };
};
export default useCurrentLeague;
