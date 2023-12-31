const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../images/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

// const upload = multer({ storage: multerStorage });

const upload = multer({ dest: 'uploads/' })

const uploadImage = upload.single('imgUrl');

module.exports = uploadImage;
