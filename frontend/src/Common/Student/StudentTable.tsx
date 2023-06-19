import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardMedia } from "@mui/material";

export interface AllStudentList {
  item: {
    _id: string;
    studentid: String;
    imgUrl: String;
    fullname: String;
    birthdate: String;
    gender: String;
    standard: String;
    fathername: String;
    Fatheroccupation: String;
    mothername: String;
    email: String;
    phone: Number;
    nationality: String;
  };
  srNo: number;
  onDelete: () => void;
}
const StudentTable: React.FC<AllStudentList> = ({ item, srNo, onDelete }) => {
  const navigate = useNavigate();
  const _id = item._id;

  return (
    <>
      <TableRow>
        <TableCell>{srNo}</TableCell>
        <TableCell>{item.studentid}</TableCell>
        <TableCell>
          <CardMedia
            component="img"
            image={`../Backend/images${item.imgUrl.toString()}`}
            sx={{
              backgroundSize: "contain",
              objectFit: "contain",
              height: "50px",
              width: "50px",
            }}
          />
        </TableCell>

        <TableCell>{item.imgUrl}</TableCell>
        <TableCell>{item.fullname}</TableCell>
        <TableCell>{item.birthdate}</TableCell>
        <TableCell>{item.standard}</TableCell>
        <TableCell>{item.gender}</TableCell>
        <TableCell>{item.phone.toString()}</TableCell>

        <TableCell
          onClick={() => {
            navigate(`/student/edit/${_id}`);
          }}
        >
          <BorderColorIcon />
        </TableCell>
        <TableCell onClick={onDelete}>
          <DeleteIcon />
        </TableCell>
        <TableCell>
          <VisibilityIcon
            onClick={() => {
              navigate(`/student/${_id}`);
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default StudentTable;
