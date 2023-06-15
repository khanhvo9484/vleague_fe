import React, { useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import {
    Box,
    Button,
    Card,
    Grid,
    List,
    ListItem,
    Paper,
    Typography,
    Divider,
} from "@mui/material";
import DefaultLayout from "../../layout/DefaultLayout";
import backgroundImage from "../../assets/background1.jpg";

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
};

const contentStyle = {
    zIndex: 2,
    width: "100%",
    position: "relative",
    paddingTop: "80px",
    boxSizing: "border-box",
    marginBottom: '20px'
};

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark,
        textTransform: 'uppercase',
        textShadow: theme.shadows[1]
    },
    inforTitle: {
        margin: '5px',
        fontStyle: 'italic' 
    },
    inforContent: {
        margin: '5px', 
        paddingLeft: '15px'
    }
}))

const playerInfor = () =>{
    useEffect(()=>{
       document.title = 'Thông tin cầu thủ'
    //    console.log(req.query.id)
    }, [])

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const playerID = queryParams.get('id');

    console.log(playerID)

    const player = {
        "id": 14,
        "idDoi": 2,
        "hoTen": "CR7",
        "ngaySinh": "2002-01-01",
        "quocTich": "Pháp",
        "hinhAnh": "https://upload.wikimedia.org/wikipedia/vi/c/c9/Cristiano_Ronaldo_2022.jpg",
        "queQuan": "Hà lội",
        "maDinhDanh": null,
        "trangThai": "Thi đấu",
        "loaiCauThu": "Ngoại binh",
        "thoiDiemBatDau": null,
        "thoiDiemKetThuc": null,
        "tongSoBanThang": 0,
        "viTri": [
            "ST"
        ]
    }

    const classes = useStyles();

    return (
        <DefaultLayout>
            <div style={backgroundStyle}></div>
            <div style={contentStyle}>
                <div style={{paddingRight:50, paddingLeft: 50}}>
                    <Box
                        sx={{
                            margin: 'auto 10',
                            padding: 5,
                            backgroundColor: 'grey.350',                            
                            borderRadius: 5,
                        }}
                    >
                        <Grid container  justifyContent="center" alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h3" className={classes.title}>
                                    Thông tin cầu thủ
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} style={{textAlign:'center'}}>
                                <img 
                                    src={player.hinhAnh}
                                    alt={player.hoTen}
                                    style={{width:'50%'}}
                                ></img>                             
                            </Grid>
                            <Grid item xs={12} sm={6} md={8}>                                
                                <Grid container columnSpacing={{ xs: 1, sm: 1, md: 2 }} rowSpacing={3}>                                    
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Tên cầu thủ:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.hoTen}
                                        </Typography>                                     
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Ngày sinh:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.ngaySinh  || <> Không có</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Quốc tịch:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.quocTich  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Quê quán:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.queQuan  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Mã định danh:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.maDinhDanh || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Trạng thái:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.trangThai  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Loại cầu thủ:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.loaiCauThu  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Vị trí:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.viTri.join(', ')  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Thời điểm bắt đầu:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.thoiDiemBatDau  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Thời điểm kết thúc:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.thoiDiemKetThuc  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Tổng số bàn thắng:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {player.tongSoBanThang  || <> Không có thông tin</>}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>

        </DefaultLayout>
    )
}

export default playerInfor