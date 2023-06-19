import React from "react";
import DrawerLayout from "../../layout/DrawerLayout";

import { Box, Grid, Paper, Typography, CircularProgress, Grow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { DashboardOutlined, GroupsSharp } from "@mui/icons-material";

import MyAxios from "../../api/MyAxios";

import useAuth from "../../hooks/useAuth";
import useCurrentLeague from "../../hooks/useCurrentLeague";

const contentStyle = {
    zIndex: 2,
    width: "100%",
    position: "relative",
    paddingTop: "20px",
};
const useStyles = makeStyles((theme) => ({
    title: {
        margin: "15px",
        padding: "10px",
    },
    boxContent: {
        marginTop: "10px",
    },
    loadingBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "20vh",
    },
    boxContainer: {
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "15px 15px 30px #d9d9d9ff",
        backgroundColor: theme.palette.blueBackground.light,
        marginBottom: "20px",
        border: "2px solid #ffffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:hover": {
            backgroundColor: theme.palette.blueBackground.main,
        },
    },
    boxContainerSelected: {
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "15px 15px 30px #d9d9d9ff",
        backgroundColor: theme.palette.success.main,
        color: theme.palette.info.light,
        marginBottom: "20px",
        border: "2px solid #ffffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
        },
    },
    subTitle: {
        textTransform: "uppercase",
        color: theme.palette.text.secondary,
        paddingTop: "5px",
        fontSize: "0.8rem!important",
    },
    subText: {
        fontSize: "0.9rem!important",
        lineHeight: "0.9rem!important",
    },
    firstName: {
        fontSize: "1rem!important",
        lineHeight: "1rem!important",
        color: theme.palette.primary.main,
    },
    lastName: {
        paddingTop: "5px",
        paddingBottom: "5px",
        fontSize: "1.2rem!important",
        lineHeight: "1.2rem!important",
        color: theme.palette.secondary.main,
    },
    soAoNumber: {
        color: theme.palette.primary.dark,
        fontSize: "3rem!important",
        alignContent: "flex-start",
        lineHeight: "3rem!important",
        paddingRight: "5px",
    },
    detailBox: {
        border: "2px solid #ffffffff",
        borderRadius: "20px",
        backgroundColor: theme.palette.success.main,
        boxShadow: "15px 15px 30px #d9d9d9ff",
    },
    soAoNumber1: {
        color: theme.palette.blueBackground.light,
        fontSize: "4rem!important",
        alignContent: "flex-start",
        lineHeight: "4rem!important",
        paddingTop: "15px",
        paddingRight: "15px",
    },
    detailBoxRow: {
        display: "flex",
        justifyItems: 'self-start',
        marginBottom: "10px",
        color:theme.palette.primary.dark,
        fontStyle:"italic",
        fontSize: "0.9rem!important",
        lineHeight: "0.9rem!important",
    }
}));

const Squad = () => {
    const authContext = useAuth();
    useEffect(() => {
        document.title = "Dashboard";
    });

    const classes = useStyles();

    const [team, setTeam] = useState({})
    const [squad, setSquad] = useState([])
    const [player, setPlayer] = useState([])
    const [topPosition, setTopPosition] = useState(0)
    const [notify, setNotify] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNotify([])
        const getRanking = async () => {
            try {
                setIsLoading(true)
                const res = await MyAxios.get(`/doibong/${authContext?.auth?.teamId}`)
                setTeam(res.data.data)
                setSquad(res.data.data.danhSachCauThuDangThiDau)
                setIsLoading(false)
            } catch (error) {
                setNotify(() => [...error.response.data.message])
            }
        }
        getRanking()
    }, [])

    useEffect(() => {
        setPlayer(squad[0])
        setTopPosition(0)
    }, [squad])

    const handleBoxClick = (event) => {
        setPlayer(squad[event?.currentTarget?.id])
        setTopPosition(event?.currentTarget?.offsetTop)
    }

    console.log(topPosition)

    const menuItems = [
        { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { text: "Đội hình", icon: <GroupsSharp />, path: "/dashboard/squad" },
    ];
    return (
        <DrawerLayout menuItems={menuItems}>
            <Box>
                <Typography variant="h2" className={classes.title}>
                    Đội hình
                </Typography>
                <Box style={contentStyle}>
                    <Grid container spacing={1} justifyContent="space-around">
                        <Grid item xs={12} sm={11} lg={6}>
                            <Box>
                                {isLoading ? (
                                    <Box className={classes.loadingBox}>
                                        <CircularProgress />
                                    </Box>
                                ) : null}
                                {
                                    !isLoading &&
                                    <Box>
                                        {
                                            squad?.map((item, index) => (
                                                item?.id != player?.id ?
                                                    <Box key={index} id={index} className={classes.boxContainer}
                                                        onClick={handleBoxClick}
                                                    >
                                                        <Box sx={{ alignSelf: "end", marginBottom: "-25px", marginLeft: "-5px" }}>
                                                            <img
                                                                // src={item.hinhAnh}
                                                                src="https://firebasestorage.googleapis.com/v0/b/myleague-c54ab.appspot.com/o/Kevin%20de%20bruyne.png?alt=media&token=30f9739a-f6a4-4ad2-9b98-f76026b82e22"
                                                                alt={`${item?.hoTen}`}
                                                                // width={60}
                                                                height={100}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body1" className={classes.firstName}>
                                                                {item?.hoTen?.split(" ").filter((str, index) => index != item?.hoTen?.split(" ").length - 1).join(" ")}
                                                            </Typography>
                                                            <Typography variant="h6" className={classes.lastName}>
                                                                {
                                                                    item?.hoTen?.split(" ")[item?.hoTen?.split(" ").length - 1]
                                                                }
                                                            </Typography>
                                                            <Box sx={{ minWidth: 200, marginTop: "10px" }}>
                                                                <Grid container spacing={1} justifyContent="space-between">
                                                                    <Grid item xs={11} sm={3} lg={3}>
                                                                        <Typography variant="body1" className={classes.subTitle}>
                                                                            Tuổi
                                                                        </Typography>
                                                                        <Typography variant="body1" className={classes.subText}>
                                                                            {item?.age}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={11} sm={5} lg={5}>
                                                                        <Typography variant="body1" className={classes.subTitle}>
                                                                            Quốc tịch
                                                                        </Typography>
                                                                        <Typography variant="body1" className={classes.subText}>
                                                                            {item?.quocTich}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={11} sm={4} lg={4}>
                                                                        <Typography variant="body1" className={classes.subTitle}>
                                                                            Vị Trí
                                                                        </Typography>
                                                                        <Typography variant="body1" className={classes.subText}>
                                                                            {item?.viTri?.join(', ')}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ maxWidth: 50, alignSelf: "start", marginTop: "-15px" }}>
                                                            <Typography variant="h6" className={classes.soAoNumber}>
                                                                {item?.soAo}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <Box key={index} id={index} className={classes.boxContainerSelected}
                                                        onClick={handleBoxClick}
                                                    >
                                                        <Box sx={{ alignSelf: "end", marginBottom: "-25px", marginLeft: "-5px" }}>
                                                            <img
                                                                // src={item.hinhAnh}
                                                                src="https://firebasestorage.googleapis.com/v0/b/myleague-c54ab.appspot.com/o/Kevin%20de%20bruyne.png?alt=media&token=30f9739a-f6a4-4ad2-9b98-f76026b82e22"
                                                                alt={`${item?.hoTen}`}
                                                                // width={60}
                                                                height={100}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body1" className={classes.firstName} sx={{ color: "#ECF2FF" }}>
                                                                {item?.hoTen?.split(" ").filter((str, index) => index != item?.hoTen?.split(" ").length - 1).join(" ")}
                                                            </Typography>
                                                            <Typography variant="h6" className={classes.lastName} sx={{ color: "#EBF3FE" }}>
                                                                {
                                                                    item?.hoTen?.split(" ")[item?.hoTen?.split(" ").length - 1]
                                                                }
                                                            </Typography>
                                                            <Box sx={{ minWidth: 200, marginTop: "10px" }}>
                                                                <Grid container spacing={1} justifyContent="space-between">
                                                                    <Grid item xs={11} sm={3} lg={3}>
                                                                        <Typography variant="body1" className={classes.subTitle} sx={{ color: "#EBF3FE" }}>
                                                                            Tuổi
                                                                        </Typography>
                                                                        <Typography variant="body1" className={classes.subText}>
                                                                            {item?.age}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={11} sm={5} lg={5}>
                                                                        <Typography variant="body1" className={classes.subTitle} sx={{ color: "#EBF3FE" }}>
                                                                            Quốc tịch
                                                                        </Typography>
                                                                        <Typography variant="body1" className={classes.subText}>
                                                                            {item?.quocTich}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={11} sm={4} lg={4}>
                                                                        <Typography variant="body1" className={classes.subTitle} sx={{ color: "#EBF3FE" }}>
                                                                            Vị Trí
                                                                        </Typography>
                                                                        <Typography variant="body1" className={classes.subText}>
                                                                            {item?.viTri?.join(', ')}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ maxWidth: 50, alignSelf: "start", marginTop: "-15px" }}>
                                                            <Typography variant="h6" className={classes.soAoNumber}>
                                                                {item?.soAo}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                            ))
                                        }
                                    </Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={10} lg={5}>
                            <Box>
                                {isLoading ? (
                                    <Box className={classes.loadingBox}>
                                        <CircularProgress />
                                    </Box>
                                ) : null}
                                {!isLoading &&
                                    <Grow
                                        in={!isLoading}
                                        {...(!isLoading ? { timeout: 2 * 800 } : {})}
                                    >
                                        <Box className={classes.detailBox} sx={{ marginTop: `${topPosition != 0 ? topPosition - 20 : topPosition}px` }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Box sx={{ alignSelf: "end", marginTop: "50px" }}>
                                                    <img
                                                        // src={player.hinhAnh}
                                                        src="https://firebasestorage.googleapis.com/v0/b/myleague-c54ab.appspot.com/o/Kevin%20de%20bruyne.png?alt=media&token=30f9739a-f6a4-4ad2-9b98-f76026b82e22"
                                                        alt={`${player.hoTen}`}
                                                        // width={60}
                                                        height={200}
                                                    />
                                                </Box>
                                                <Box sx={{ justifyItems: "self-start" }}>
                                                    <Typography variant="body1" sx={{ color: "#ECF2FF", fontSize: "1.2rem", lineHeight: "1.2rem", paddingBottom: "5px" }}>
                                                        {player?.hoTen?.split(" ").filter((str, index) => index != player?.hoTen?.split(" ").length - 1).join(" ")}
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ color: "#EBF3FE", fontSize: "1.5rem", lineHeight: "1.5rem", }}>
                                                        {
                                                            player?.hoTen?.split(" ")[player?.hoTen.split(" ").length - 1]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ maxWidth: 120, alignSelf: "start" }}>
                                                    <Typography variant="h6" className={classes.soAoNumber1}>
                                                        {player?.soAo}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Paper sx={{ borderRadius: "0px 0px 18px 18px", padding: "15px 30px" }}>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Ngày sinh:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.ngaySinh}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Tuổi:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.age}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Quốc tịch:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.quocTich}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Quê quán:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.queQuan}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Mã định danh:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.maDinhDanh}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Trạng thái:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.trangThai}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Loại cầu thủ:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.loaiCauThu}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Vị trí:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.viTri?.join(", ")}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Tổng số bàn thắng:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.tongSoBanThang}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Thời điểm bắt đầu:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.thoiDiemBatDau}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.detailBoxRow}>
                                                    <Typography variant="body1">
                                                        Thời điểm kết thúc:
                                                    </Typography>
                                                    <Typography variant="body1" sx={{marginLeft:"5px", fontStyle:"normal", fontWeight:"bold", color:"#07b696"}}>
                                                        {player?.thoiDiemKetThuc}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Box>
                                    </Grow>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DrawerLayout>
    );
};

export default Squad;
