import React, { useEffect } from "react";
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
};

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark,
        textTransform: 'uppercase',
        textShadow: theme.shadows[1]
    },
    inforTitle: {
        margin: '5px'
    },
    inforContent: {
        margin: '5px', 
        paddingLeft: '15px'
    }
}))

const playerInfor = () =>{
    useEffect(()=>{
       document.title = 'Thông tin cầu thủ'
    }, [])

    const player = {
        hoTen:"Cristiano Ronaldo",
        ngaySinh:"1985-02-05",
        quocTich: "Portugal",
        hinhAnh: "https://i.pinimg.com/474x/c8/7f/76/c87f765b7adc9b0c74431e12ef74eb37--christano-ronaldo-cristiano-ronaldo-.jpg",
        queQuan: "Portugal",
        trangThai: "Tự do",
        loaiCauThu:"Gay",
        viTri: ["ST", "LF"]
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
                                                {player.ngaySinh}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                                Quốc tịch:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                                {player.quocTich}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                                Quê quán:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                                {player.queQuan}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                                Trạng thái:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                                {player.trangThai}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                                Vị trí:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                                {player.viTri.join(', ')}
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