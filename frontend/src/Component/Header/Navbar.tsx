import {
  AppBar,
  CssBaseline,
  Typography,
  Grid,
  Container,
  InputBase,
  Button,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "black",
      color: "white",
      position: "sticky",
      top: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
    },

    drawerPaper: {
      width: 240,
      overflow: "hidden",
      borderRadius: "5px",
      // height: "65%",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    },
  })
);
export {};

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const logOutHandler = async () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      {/* {localStorage.getItem("token") ? ( */}
      <AppBar position="sticky" className={classes.root}>
        <Container maxWidth="xl">
          <CssBaseline />
          <Grid container justifyContent="space-between" alignItems="center">
            <Toolbar>
              <Button color="inherit" onClick={toggleSidebar}>
                <FormatListBulletedIcon fontSize="large" />
              </Button>
            </Toolbar>
            <Drawer
              open={isOpen}
              onClose={toggleSidebar}
              style={{ width: 500 }}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                style={{
                  margin: "10%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Logo
              </Typography>
              <List style={{ paddingLeft: "14px" }}>
                <hr style={{ opacity: "0.3" }} />

                <ListItem button component={Link} to="/student/add">
                  <span style={{ marginRight: "5px" }}>
                    <AddCircleIcon />
                  </span>
                  <ListItemText primary="Add Student" />
                </ListItem>
                <hr style={{ opacity: "0.3" }} />
                <ListItem button component={Link} to="">
                  <span style={{ marginRight: "5px" }}>
                    <SummarizeIcon />
                  </span>
                  <ListItemText primary="All Students" />
                </ListItem>
                <hr style={{ opacity: "0.3" }} />

                <ListItem button component={Link} to="/signin">
                  <span style={{ marginRight: "5px" }}>
                    <LogoutIcon />
                  </span>
                  <ListItemText primary="Log Out" onClick={logOutHandler} />
                </ListItem>
              </List>
            </Drawer>

            <Grid item md={1} sm={2}>
              <div>
                {
                  localStorage.getItem("token")?
                <Link
                  to="/signin"
                  onClick={logOutHandler}
                  style={{
                    color: "white",
                    background: "primary.main",
                    fontSize: "18px",
                    textDecoration: "none",
                  }}
                >
                  Log out
                </Link>
                :
                <Link
                  to="/signin"
                  style={{
                    color: "white",
                    background: "primary.main",
                    fontSize: "18px",
                    textDecoration: "none",
                  }}
                >
                 Sign In
                </Link>
                }

              </div>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
