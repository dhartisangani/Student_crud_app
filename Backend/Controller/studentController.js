const Students = require('../modals/Students');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const studentvalidator = require('../Validator/studentvalidator');
const multer = require('multer');


exports.addstudent = async (req, res) => {
    console.log(req.body)
    console.log("-------------------------->", req.file)
    try {
        const {
            studentid,
            fullname,
            birthdate,
            gender,
            standard,
            fathername,
            Fatheroccupation,
            mothername,
            email,
            phone,
            nationality,
        } = req.body;

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }

        const studentData = {
            imgUrl: req.file.filename,
            studentid,
            fullname,
            birthdate,
            gender,
            standard,
            fathername,
            Fatheroccupation,
            mothername,
            email,
            phone,
            nationality,
        };

        const { errors, isValid } = studentvalidator(studentData);
        if (!isValid) {
            return res.status(400).json({ errors });
            next(err) // Pass error to Express

        }

        const student = await Students.create(studentData);
        const savestudent = await student.save();
        res.json(savestudent);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error...');
    }
};


// Get Student data by  _Id  
exports.getStudentByID = async (req, res) => {
    try {
        const Id = req.params.id;
        const student = await Students.findOne({ _id: new ObjectId(Id) });
        // const student = await Student.findOne({ id: id }); 
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.send(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error...");
    }
};

// Update Student data 
exports.updateStudentwithID = async (req, res) => {
    console.log(req.body)
    console.log("updated image", req.file)
    const {
        studentid,
        fullname,
        birthdate,
        gender,
        standard,
        fathername,
        Fatheroccupation,
        mothername,
        email,
        phone,
        nationality,
    } = req.body

    const {imgUrl} = req.file.filename
    let student = await Students.findById(req.params.id)
    try {
        const updatestudent = {}
        if (imgUrl) { updatestudent.imgUrl = imgUrl }
        if (studentid) { updatestudent.studentid = studentid }
        if (fullname) { updatestudent.fullname = fullname }
        if (birthdate) { updatestudent.birthdate = birthdate }
        if (gender) { updatestudent.gender = gender }
        if (standard) { updatestudent.standard = standard }
        if (fathername) { updatestudent.fathername = fathername }
        if (Fatheroccupation) { updatestudent.Fatheroccupation = Fatheroccupation }
        if (mothername) { updatestudent.mothername = mothername }
        if (email) { updatestudent.shortDesc = email }
        if (phone) { updatestudent.shortDesc = phone }
        if (nationality) { updatestudent.shortDesc = nationality }

        if (!student) {
            return res.status(404).send('Not found')
        }
        // if (student.user.toString() !== req.user._id) {
        //     return res.status(401).send('Not allowed')
        // }
        student = await Students.findByIdAndUpdate(req.params.id, { $set: updatestudent }, { new: true })
        res.json({ student })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};

// Delete Student  

exports.deleteStudent = async (req, res) => {
    let student = await Students.findById(req.params.id)
    try {

        if (!student) {
            return res.status(404).send('Not found')
        }
        // if (student.user.toString() !== req.user.id) {  
        //     return res.status(401).send('Not allowed')
        // }
        student = await Students.findByIdAndDelete(req.params.id)
        res.json({ "success": "Deleted successfully", student: student })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
};

// Get all Students data with pagination and serchvalue

exports.getStudentWithSerchandPagination = async (req, res) => {
    try {
        const searchValue = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let query = {};
        if (searchValue) {
            query = { $text: { $search: searchValue } };
        }

        const productsCount = await Students.countDocuments(query);
        const totalPages = Math.ceil(productsCount / limit);

        const products = await Students.find(query)
            .skip(startIndex)
            .limit(limit);

        const response = {
            total_pages: totalPages,
            current_page: page,
            total_products: productsCount,
            products: products,
        };
        res.send(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error...");
    }
};

// Get all Student data 
exports.getAllStudents = async (req, res) => {
    try {
        const id = req.body
        const student = await Students.find(id);
        res.send(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error...");
    }
};

