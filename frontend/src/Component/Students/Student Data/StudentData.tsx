import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Card, CardMedia } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useEffect, useRef, useState } from "react";

import instance from "../../../Services/AxiosInterCeptors";
import { API_BASE_URL } from "../../../Configs/AppConfig";
import { AllStudentList } from "../../../Common/Student/StudentTable";
import { AllStudent } from "../../../Types/Type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "10vh",
      alignItems: "left",
    },
    imgGrid: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "contain",
      [theme.breakpoints.down("lg")]: {
        minHeight: "50vh",
      },
    },
    image: {
      position: "relative",
      top: "5%",
      objectFit: "contain",
      height: "100%",
      fontWeight: "bold",
      backgroundSize: "contain",
      width: "30%",
      [theme.breakpoints.down("lg")]: {
        height: "100%",
        width: "100%",
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      padding: theme.spacing(3),
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        margin: "auto",
      },
    },
  })
);

function StudentData() {
  const classes = useStyles();
  const { _id } = useParams<{ _id: string }>();
  const [data, setData] = useState<AllStudent | null>(null);
  const reviewUser = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await instance.get(`${API_BASE_URL}/${_id}`, {
          headers: {
            // "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.data;

        setIsLoading(false);
        window.scrollTo(0, 0);
        setData(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchProduct();
  }, [_id]);

  if (isLoading) {
    return (
      <Typography variant="h4" gutterBottom align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <div style={{ marginTop: "10%" }}>
      <Typography variant="h4" gutterBottom align="center">
        Student Detail
      </Typography>
      {data && (
        <Card>
          <Grid container spacing={1} mb={5} className={classes.root}>
            <Grid item xs={10} md={5} sm={4} mt={7} className={classes.imgGrid}>
              <CardMedia
                className={classes.image}
                // image={data.item.imgUrl}
                component="img"
              />
            </Grid>
            <Grid item xs={10} md={5} sm={5} mt={7}>
              <Typography variant="h4" mb={1}>
                {data.fullname}
              </Typography>
              <Typography
                variant="h4"
                alignItems="center"
                flexDirection="row"
                display="flex"
                gap={3}
                mb={2}
              >
                <Typography variant="body1">
                  {data.birthdate} ratings
                </Typography>
              </Typography>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {data.gender}
              </Typography>
              <Typography component="p" mb={1}>
                Available Qty:{" "}
                <span style={{ fontWeight: "bold" }}>{data.standard}</span>
              </Typography>
              <Typography variant="body1">{data.fathername}</Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </div>
  );
}

export default StudentData;
