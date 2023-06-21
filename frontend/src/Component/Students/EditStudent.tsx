import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AddnewStudent } from "../../Types/Type";
import StudentForm from "../../Common/Student/StudentForm";
import instance from "../../Services/AxiosInterCeptors";
import { API_BASE_URI, UPDATE_STUDENT } from "../../Configs/AppConfig";

const EditStudent = () => {
  const [loading, setLoading] = useState(false);
  const { _id } = useParams<{ _id: string }>();
  const [studentData, setStudentData] = useState<AddnewStudent>({
    studentid: "",
    division: "",
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
  });
  const navigate = useNavigate();

  // fetch studentdata from api
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get(`${API_BASE_URI}/${_id}`, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.data;
        setStudentData(data);
      } catch (error) {
        console.error("error");
      }
    };

    fetchStudentData();
  }, [_id]);

  // Update student data
  const handleSubmit = async (values: any) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    console.log(values);

    // Append form values to the FormData object
    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      const response = await axios.put(`${UPDATE_STUDENT}${_id}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      setLoading(false);
      console.log("Submitted form:", values);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Grid container spacing={1} mb={5} mt={5}>
      <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
        <Typography variant="h5" gutterBottom>
          Edit Student Details
        </Typography>
        <StudentForm initialValues={studentData} onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default EditStudent;
