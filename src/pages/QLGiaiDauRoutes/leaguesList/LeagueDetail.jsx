import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Box, Grid, Typography } from "@mui/material";
import OneLeague from "./OneLeague";
import MyAxios from "../../../api/MyAxios";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayout";
const LeagueDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [league, setLeague] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ message: "", type: "" });
  useEffect(async () => {
    const abortController = new AbortController();
    setIsLoading(true);
    try {
      const res = await MyAxios.get(`/giaidau/chitiet?giaidau=${id}`, {
        signal: abortController.signal,
      });
    } catch (err) {
      setNotify({ message: err?.data?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
    return () => abortController.abort();
  }, []);
  return <div>LeagueDetail</div>;
};

export default LeagueDetail;
