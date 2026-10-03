const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { createError } = require('../utils/apiResponse');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(createError('Invalid file type. Only jpg, jpeg, png and webp are allowed.', 400), false);
  }
  cb(null, true);
};

const storageFactory = (folder) => {
  const uploadPath = path.join(__dirname, '..', 'uploads', folder);
  ensureDir(uploadPath);

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    }
  });
};

const productUpload = multer({
  storage: storageFactory('products'),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

const prescriptionUpload = multer({
  storage: storageFactory('prescriptions'),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = {
  uploadProduct: productUpload.single('image'),
  uploadPrescription: prescriptionUpload.single('prescriptionImage')
};
