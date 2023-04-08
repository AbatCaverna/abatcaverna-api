import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

function filter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    cb(null, true)
  } else if (file.size > 5000000) {
    cb(null, false)
    return cb(new Error('File too big. The must have 5MB maximum!'))
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}

const upload = multer({ dest: 'uploads/', fileFilter: filter })

export default upload.single('photo')
