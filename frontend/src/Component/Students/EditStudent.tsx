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
  // const handleSubmit = async (values: any) => {
  //   const token = localStorage.getItem("token");
  //   const formData = { ...values };

  //   try {
  //     // Convert the selected image file to base64
  //     const base64Image = await convertImageToBase64(values.imgUrl);
  //     formData.imgUrl = base64Image;

  //     const response = await axios.put(`${UPDATE_STUDENT}${_id}`, formData, {
  //       headers: {
  //         Authorization: token,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = response.data;
  //     console.log(data)
  //     setLoading(false);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const convertImageToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const base64Image = reader.result?.toString()?.split(",")[1];
  //       if (base64Image) {
  //         resolve(base64Image);
  //       } else {
  //         reject(new Error("Failed to convert image to base64."));
  //       }
  //     };

  //     reader.onerror = (error) => {
  //       reject(error);
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };
  const handleSubmit = async (values: any) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
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
