import { createContext } from "react";
import { useState } from "react";

const CurrentLeagueContext = createContext({});
export const CurrentLeagueProvider = ({ children }) => {
  const [currentLeague, setCurrentLeague] = useState();
  const [currentSchedule, setCurrentSchedule] = useState();
  const [currentMatchDay, setCurrentMatchDay] = useState();
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentClub, setCurrentClub] = useState();
  const [currentStadium, setCurrentStadium] = useState();
  const [currentManager, setCurrentManager] = useState();
  const [checkRuleResult, setCheckRuleResult] = useState(false);
  return (
    <CurrentLeagueContext.Provider
      value={{
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
        checkRuleResult,
        setCheckRuleResult,
      }}
    >
      {children}
    </CurrentLeagueContext.Provider>
  );
};
export default CurrentLeagueContext;
