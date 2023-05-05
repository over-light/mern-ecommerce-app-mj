const multer = require('multer');              // multer will be used to handle the form data.

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
const storage = multer.memoryStorage({
    destination(req, file, cb) {
        cb(null, '');
    }
});

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
};
const fileUpload = multer({ storage, fileFilter: filefilter });

module.exports = fileUpload;