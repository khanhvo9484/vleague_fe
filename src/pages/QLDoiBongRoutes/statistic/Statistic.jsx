import {
  Box,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrganizerLayout from "../../../layout/OrganizerLayout";
import { useState, useEffect } from "react";
import ComponentLayoutBackdrop from "../../../layout/ComponentLayoutBackdrop";
import AllLeaguesSelector from "../../../components/ui/AllLeaguesSelector";
import MyAxios from "../../../api/MyAxios";
import { Add } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import CustomSnackbar from "../../../components/ui/CustomSnackbar";
import ManagerLayout from "../../../layout/ManagerLayout";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useLocation } from "react-router-dom";
const Statistic = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [currentLeague, setCurrentLeague] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notify, setNotify] = useState({ type: "", message: "" });
  const { auth } = useAuth();
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [alreadyCreated, setAlreadyCreated] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Số trận thắng");
  const [data, setData] = useState({ labels: [], datasets: [] });
  useEffect(async () => {
    setSelectedValue("");
    if (currentLeague) {
      setIsLoading(true);
      console.log(currentLeague);
      try {
        const res = await MyAxios.get(`/muagiai/${currentLeague?.id}/ranking`);
        if (res?.data?.data) {
          setCurrentSchedule(res.data.data);
        }
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
        setNotify({ message: err?.data?.message, type: "error" });
        setCurrentSchedule([]);
      } finally {
        setIsLoading(false);
        setAlreadyCreated(true);
      }
    }
    if (!currentLeague) {
      setCurrentSchedule([]);
    }
    setSelectedValue("Số trận thắng");
  }, [currentLeague]);

  useEffect(() => {
    if (selectedValue === "Số trận thắng") {
      setData({
        labels: currentSchedule?.map((item) => item?.ten_doi),
        datasets: [
          {
            label: "Số trận thắng",
            data: currentSchedule?.map((item) => item?.tranThang),
            backgroundColor: "rgba(132, 204, 253, 1)", // Blue color for bars
          },
        ],
      });
    }
    if (selectedValue === "Số bàn thắng") {
      setData({
        labels: currentSchedule?.map((item) => item?.ten_doi),
        datasets: [
          {
            label: "Số bàn thắng",
            data: currentSchedule?.map((item) => item?.phaLuoi),
            backgroundColor: "rgba(78, 212, 105, 1)", // Blue color for bars
          },
        ],
      });
    }
    if (selectedValue === "Số bàn thua") {
      setData({
        labels: currentSchedule?.map((item) => item?.ten_doi),
        datasets: [
          {
            label: "Số bàn thua",
            data: currentSchedule?.map((item) => item?.thungLuoi),
            backgroundColor: "rgba(250, 82, 82, 1)", // Blue color for bars
          },
        ],
      });
    }
  }, [selectedValue]);
  const options = {
    indexAxis: "y", // Set the index axis to "y" for horizontal bars
    responsive: true,
    // plugins: {
    //   //   legend: {
    //   //     position: "top",
    //   //   },
    // },
    // grid: {
    //   display: false, // Hide the x-axis grid lines
    // },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          // Customize the x-axis tick labels
          callback: (value) => {
            // Display only integers, and skip floating point numbers
            if (Number.isInteger(value)) {
              return value;
            }
            return ""; // Empty string to hide the floating point tick labels
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
    },

    barPercentage: 0.4, // Adjust the width of the bars (70% of available space)
    categoryPercentage: 0.9,
  };
  return (
    <ManagerLayout title={"Thống kê"}>
      <AllLeaguesSelector
        currentLeague={currentLeague}
        setCurrentLeague={setCurrentLeague}
        selectId={id}
      ></AllLeaguesSelector>
      <ComponentLayoutBackdrop isLoading={isLoading} notify={notify}>
        <Grid
          container
          component={Paper}
          elevation={3}
          sx={{ mt: "1rem", padding: "0.5rem" }}
        >
          <Grid
            item
            container
            xs={12}
            sx={{ padding: "1rem", backgroundColor: "blueBackground.manage" }}
          >
            {!isLoading && !currentLeague && !currentSchedule?.length > 0 && (
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Hãy chọn giải đấu
              </Typography>
            )}
            {!isLoading && currentLeague && !currentSchedule?.length > 0 && (
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Hiện chưa có thống kê đấu của giải đấu này
              </Typography>
            )}

            {!isLoading && currentLeague && currentSchedule?.length > 0 && (
              <Grid
                container
                sx={{ mb: "0.5rem", padding: "1rem" }}
                component={Paper}
                elevation={3}
              >
                <Grid container>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={selectedValue === "Số trận thắng"}
                      onChange={() => setSelectedValue("Số trận thắng")}
                      sx={{ mr: "-0.5rem" }}
                    ></Checkbox>
                    <Typography variant="h6">Số trận thắng</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: "1rem",
                    }}
                  >
                    <Checkbox
                      checked={selectedValue === "Số bàn thắng"}
                      onChange={() => setSelectedValue("Số bàn thắng")}
                      sx={{ mr: "-0.5rem" }}
                    ></Checkbox>
                    <Typography variant="h6">Số bàn thắng</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: "1rem",
                    }}
                  >
                    <Checkbox
                      checked={selectedValue === "Số bàn thua"}
                      onChange={() => setSelectedValue("Số bàn thua")}
                      sx={{ mr: "-0.5rem" }}
                    ></Checkbox>
                    <Typography variant="h6">Số bàn thua</Typography>
                  </Box>
                </Grid>
                <Bar data={data} options={options}></Bar>
              </Grid>
            )}
          </Grid>
        </Grid>
        <CustomSnackbar
          isOpen={isOpenSnackbar}
          setIsOpen={setIsOpenSnackbar}
          message={snackbarMessage}
          type={snackbarType}
        ></CustomSnackbar>
      </ComponentLayoutBackdrop>
    </ManagerLayout>
  );
};

export default Statistic;
