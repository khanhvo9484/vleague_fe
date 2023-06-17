import { createContext } from "react";
import { useState } from "react";

const CurrentLeagueContext = createContext({});
export const CurrentLeagueProvider = ({ children }) => {
  const [currentLeague, setCurrentLeague] = useState();
  const [currentSchedule, setCurrentSchedule] = useState();
  const [currentMatchDay, setCurrentMatchDay] = useState();
  return (
    <CurrentLeagueContext.Provider
      value={{
        currentLeague,
        setCurrentLeague,
        currentSchedule,
        setCurrentSchedule,
        currentMatchDay,
        setCurrentMatchDay,
      }}
    >
      {children}
    </CurrentLeagueContext.Provider>
  );
};
export default CurrentLeagueContext;
