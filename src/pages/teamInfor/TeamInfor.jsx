import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Table,
    TablePagination,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
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
        color: theme.palette.purple.A100,
        textTransform: 'uppercase',
        textShadow: theme.shadows[1]
    },
    subtitle: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        textShadow: theme.shadows[1]
    },
    inforTitle: {
        margin: '5px',
        fontStyle: 'italic' 
    },
    inforSubTitle: {
        margin: '5px',
        paddingLeft: '10px',
    },
    inforContent: {
        margin: '5px', 
        paddingLeft: '20px'
    },
    tableTitle:{
        color: theme.palette.primary.light,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    tableRow:{        
        "&:nth-child(odd)":{
            backgroundColor: '#dff1fd',            
        },
        "&:nth-child(even)":{
            backgroundColor: '#ffffff'
        },        
    },
    linkSub:{
        color: theme.palette.primary.main,
        "&:hover":{
            textDecoration: 'underline',
            color: theme.palette.primary.dark
        }
    }
}))
  
const teamInfor = () =>{
    useEffect(()=>{
       document.title = 'Thông tin đội bóng'
    }, [])

    const team = {
        "id": 2,
        "ten": "đội 2",
        "hinhAnh": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Saigon_FC_logo_%282016%29.svg/1200px-Saigon_FC_logo_%282016%29.svg.png",
        "namThanhLap": 2021,
        "sanNha": {
            "id": 2,
            "tenSan": "sân 2",
            "diaDiem": "hn"
        },
        "quanLy": {
            "id": 2,
            "hoTen": "quản lý 2",
            "ngaySinh": "2023-06-21",
            "hinhAnh": null
        },
        "danhSachCauThuDangThiDau": [
            {
                "id": 12,
                "idDoi": 2,
                "hoTen": "Franki De Jong",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": null,
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-08",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "CAM"
                ]
            },
            {
                "id": 13,
                "idDoi": 2,
                "hoTen": "Steven Gerrand",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": null,
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-08",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "CAM",
                    "CM"
                ]
            },
            {
                "id": 14,
                "idDoi": 2,
                "hoTen": "CR7",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": null,
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-08",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "ST"
                ]
            },
            {
                "id": 15,
                "idDoi": 2,
                "hoTen": "Đỗ Kim Phúc",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": "097202022118",
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-09",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "CAM"
                ]
            },
            {
                "id": 17,
                "idDoi": 2,
                "hoTen": "Hoàng Huy Hoàng",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": "097202022221138",
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-09",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "CAM"
                ]
            },
            {
                "id": 18,
                "idDoi": 2,
                "hoTen": "Hazard",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": "0972011222022118",
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-09",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "CAM",
                    "CM"
                ]
            },
            {
                "id": 19,
                "idDoi": 2,
                "hoTen": "Chú bé Dan",
                "ngaySinh": "2002-01-01",
                "quocTich": "Pháp",
                "hinhAnh": "link hinh anh",
                "queQuan": "Hà lội",
                "maDinhDanh": "1231332312",
                "trangThai": "Thi đấu",
                "loaiCauThu": "Nhập tịch",
                "thoiDiemBatDau": "2023-06-09",
                "thoiDiemKetThuc": "2027-05-10",
                "tongSoBanThang": 0,
                "viTri": [
                    "ST"
                ]
            }
        ]
    }

    const rows = team.danhSachCauThuDangThiDau

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                        <Grid container justifyContent="center" alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h3" className={classes.title}>
                                    Thông tin đội bóng
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container columnSpacing={{ xs: 1, sm: 1, md: 2 }} rowSpacing={3} justifyContent="center" alignItems="center" >
                                    <Grid item xs={12} sm={6} md={5} style={{textAlign:'center'}}>
                                        <img 
                                            src={team.hinhAnh}
                                            alt={`Logo của đội ${team.ten}`}
                                            style={{width:'50%'}}
                                        ></img> 
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={7}>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Tên đội bóng:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {team.ten}
                                        </Typography>
                                        <Typography variant="body1" className={classes.inforTitle}>
                                            Năm thành lập:
                                        </Typography>
                                        <Typography variant="h5" className={classes.inforContent}>
                                            {team.namThanhLap}
                                        </Typography>
                                        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 2 }} rowSpacing={3}>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Typography variant="body1" className={classes.inforTitle}>
                                                Thông tin sân nhà:
                                                </Typography>
                                                <Typography variant="body2" className={classes.inforSubTitle}>
                                                    Tên sân:
                                                </Typography>
                                                <Typography variant="h5" className={classes.inforContent}>
                                                    {team.sanNha.tenSan}
                                                </Typography>
                                                <Typography variant="body2" className={classes.inforSubTitle}>
                                                    Địa điểm:
                                                </Typography>
                                                <Typography variant="h5" className={classes.inforContent}>
                                                    {team.sanNha.diaDiem}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Typography variant="body1" className={classes.inforTitle}>
                                                Thông tin người quản lý:
                                                </Typography>
                                                <Typography variant="body2" className={classes.inforSubTitle}>
                                                    Họ Tên:
                                                </Typography>
                                                <Typography variant="h5" className={classes.inforContent}>
                                                    {team.quanLy.hoTen}
                                                </Typography>
                                                <Typography variant="body2" className={classes.inforSubTitle}>
                                                    Ngày Sinh:
                                                </Typography>
                                                <Typography variant="h5" className={classes.inforContent}>
                                                    {team.quanLy.ngaySinh}
                                                </Typography>
                                            </Grid>
                                        </Grid>  
                                    </Grid>
                                </Grid>                                
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h5" className={classes.subtitle}>
                                    Danh sách cầu thủ đang thi đấu
                                </Typography>
                                <Paper>
                                    <TableContainer sx={{maxHeight: 400}}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell key={'stt'} align="center" style={{minWidth: 20}} sx={{backgroundColor: '#1b9beb'}}>
                                                        <Typography variant="body1" className={classes.tableTitle} style={{fontWeight:'bold'}}>
                                                            STT
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell key={'name'} align="center" style={{minWidth: 80}} sx={{backgroundColor: '#1b9beb'}}>
                                                        <Typography variant="body1" className={classes.tableTitle} style={{fontWeight:'bold'}}>
                                                            Họ Tên
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell key={'birthday'} align="center" style={{minWidth: 50}} sx={{backgroundColor: '#1b9beb'}}>
                                                        <Typography variant="body1" className={classes.tableTitle} style={{fontWeight:'bold'}}>
                                                            Ngày Sinh
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell key={'type'} align="center" style={{minWidth: 50}} sx={{backgroundColor: '#1b9beb'}}>
                                                        <Typography variant="body1" className={classes.tableTitle} style={{fontWeight:'bold'}}> 
                                                            Loại cầu thủ
                                                        </Typography>                                                        
                                                    </TableCell>
                                                    <TableCell key={'status'} align="center"style={{minWidth: 50}} sx={{backgroundColor: '#1b9beb'}}>
                                                        <Typography variant="body1" className={classes.tableTitle} style={{fontWeight:'bold'}}>
                                                            Trạng thái
                                                        </Typography>                                                        
                                                    </TableCell>
                                                    <TableCell key={'note'} align="center" style={{minWidth: 60}} sx={{backgroundColor: '#1b9beb'}}>
                                                        <Typography variant="body1" className={classes.tableTitle} style={{fontWeight:'bold'}}>
                                                            Ghi chú
                                                        </Typography>                                                        
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index) => {
                                                        return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={index} className={classes.tableRow}>
                                                            <TableCell key={'stt'} align="center" style={{minWidth: 20}}>
                                                                <Typography variant="body1" style={{fontWeight:'bold'}}>
                                                                    {index + 1}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell key={'name'} align="left" style={{minWidth: 80}}>
                                                                <Typography variant="body1">
                                                                    {row.hoTen}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell key={'birthday'} align="left" style={{minWidth: 60}}>
                                                                <Typography variant="body1">
                                                                {row.ngaySinh}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell key={'type'} align="center" style={{minWidth: 60}}>
                                                                <Typography variant="body1">
                                                                {row.loaiCauThu}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell key={'status'} align="center"style={{minWidth: 60}}>
                                                                <Typography variant="body1">
                                                                {row.trangThai}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell key={'note'} align="center" style={{minWidth: 60}}>
                                                                    <Link to={`/playerInfor?id=${row.id}`}>
                                                                        <Typography variant="body1" className={classes.linkSub}>
                                                                            Xem thông tin chi tiết
                                                                        </Typography>
                                                                    </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                        );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer> 
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 50]}
                                        component="div"
                                        count={rows? rows.length : 0}
                                        rowsPerPage={rows? rowsPerPage : 0}
                                        page={rows? page : 0}                               
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    >                                        
                                    </TablePagination>                                  
                                </Paper>
                            </Grid>
                        </Grid>   
                    </Box>
                </div>
            </div>

        </DefaultLayout>
    )
}

export default teamInfor