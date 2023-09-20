import multer from 'multer';
import ErrorAPI from '../utils/errorAPI.js';

export const uploadMixOfImages = (fieldName, numberOfImgs, path, prefix) => {
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const exe = file.mimetype.split('/')[1];
      const fileName = `${prefix}-${Date.now()}.${exe}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if (imageType === 'image') {
      return cb(null, true);
    } else {
      return cb(new ErrorAPI('يجب أن يكون الملف صورة', 400), false);
    }
  };

  const upload = multer({ storage: diskStorage, fileFilter: fileFilter });
  return upload.array(fieldName, numberOfImgs);
};
