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

const useStyles = makeStyles(() => ({
    boxContent: {
        margin: 'auto 10',
        padding: 20,
        backgroundColor: 'grey.300',
        opacity: 0.6,
        borderRadius: 5,
    },
    
}))

const playerInfor = () =>{
    useEffect(()=>{
       document.title = 'Thông tin cầu thủ'
    }, [])

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
                            backgroundColor: 'grey.300',
                            opacity: 0.6,
                            borderRadius: 5,
                        }}
                    >
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6} sm={6} md={4}>
                                textImng
                            </Grid>
                            <Grid item xs={6} sm={6} md={8}>
                                textImng2
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>

        </DefaultLayout>
    )
}

export default playerInfor