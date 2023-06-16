import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import StudentForm from "../../Common/Student/StudentForm";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/school/student/add",
        values,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = response.data;
      console.log(data);

      setLoading(false);
      console.log("Submitted form:", values);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    studentid: "",
    imgUrl: "",
    fullname: "",
    birthdate: "",
    gender: "",
    standard: "",
    fathername: "",
    Fatheroccupation: "",
    mothername: "",
    email: "",
    phone: 0,
    nationality: "",
  };

  return (
    <Grid container spacing={1} mb={5} mt={5}>
      <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
        <Typography variant="h5" gutterBottom>
          Student Admission From
        </Typography>
        <StudentForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default AddStudent;
