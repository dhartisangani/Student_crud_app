const express = require('express');
const router = express.Router();
const { addstudent, getAllStudents, getStudentByID, getStudentWithSerchandPagination, updateStudentwithID, deleteStudent } = require('../Controller/studentController');
const authToken = require('../middleWare/authToken');
const uploadImage = require('../middleWare/uploadImage');
const StudentAdd = process.env.ADD_STUDENT
const StudentEdit = process.env.UPDATE_STUDENT
const StudentDelete = process.env.DELETE_STUDENT
const StudentAll = process.env.GET_ALL_STUDENT
const StudentWithId = process.env.GET_STUDENT_WITH_ID
const StudentwithPagination = process.env.GET_STUDENT_WITH_PAGINATION

// Add Student
router.post(StudentAdd, uploadImage, authToken, addstudent);

// Update Student with ID 
router.put(StudentEdit, uploadImage, authToken, updateStudentwithID)

// Delete Student 
router.delete(StudentDelete, authToken, deleteStudent)

// Get All StudentList 
router.get(StudentAll, authToken, getAllStudents)

// Get single Student data with  _ID 
router.get(StudentWithId, authToken, getStudentByID);

// Get Student with Search and Pagination 
// http://localhost:8080/api/student/all?search=$"'&page=$1&limit=$1
router.get(StudentwithPagination, authToken, getStudentWithSerchandPagination);


module.exports = router
