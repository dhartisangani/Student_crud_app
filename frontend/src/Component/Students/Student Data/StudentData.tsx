import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useEffect, useRef, useState } from "react";

import instance from "../../../Services/AxiosInterCeptors";
import { API_BASE_URI, GET_IMAGE } from "../../../Configs/AppConfig";
import { AllStudent } from "../../../Types/Type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "10vh",
      alignItems: "left",
      display: "flex",
      justifyContent: "center",
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
    const fetchStudent = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await instance.get(`${API_BASE_URI}/${_id}`, {
          headers: {
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
    fetchStudent();
  }, [_id]);

  if (isLoading) {
    return (
      <Typography variant="h4" gutterBottom align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Container
      style={{
        marginTop: "5%",
        width: "45%",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Student Detail
      </Typography>
      {data && (
        <Card>
          <Grid container>
            <Grid item xs={12} md={4} sm={4} className={classes.imgGrid}>
              <CardMedia
                component="img"
                alt="Student Image"
                image={`${GET_IMAGE}${data.imgUrl}`}
                style={{
                  backgroundSize: "contain",
                  objectFit: "contain",
                  height: "150px",
                  width: "150px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={8} sm={8}>
              <CardContent>
                <Typography component="p" variant="h5" fontWeight="bold">
                  FullName: {data.fullname}
                </Typography>
                <Typography component="p" variant="body1">
                  Standard:
                  <span style={{ fontWeight: "bold" }}>{data.standard}</span>
                </Typography>
                <Typography component="p" variant="body1">
                  Date of Birth: {data.birthdate}
                </Typography>
                <Typography component="p" variant="body1">
                  Gender: {data.gender}
                </Typography>

                <Typography component="p" variant="body1">
                  Father's Name: {data.fathername}
                </Typography>
                <Typography component="p" variant="body1">
                  Mother's Name: {data.mothername}
                </Typography>
                <Typography component="p" variant="body1">
                  Father's Occupation: {data.Fatheroccupation}
                </Typography>
                <Typography component="p" variant="body1">
                  Contact No: {data.phone.toString()}
                </Typography>
                <Typography component="p" variant="body1">
                  Nationality : {data.nationality}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
}

export default StudentData;
