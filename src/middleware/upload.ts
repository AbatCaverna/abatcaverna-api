import multer, { FileFilterCallback } from 'multer'
import multers3 from 'multer-s3'
import { Request } from 'express'
import clients3 from '../providers/storage'

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

const upload = multer({
  storage: multers3({
    s3: clients3,
    bucket: 'abatcaverna',
    acl: 'public-read',
    metadata: (req, file, cp) => cp(null, { fieldname: file.fieldname }),
    key: (req, file, cp) => {
      const fileName = `${Date.now()}_${file.filename}_${file.originalname}`
      cp(null, fileName)
    }
  }),
  fileFilter: filter
})

const exportUpload = (fieldName: string) => {
  return upload.single(fieldName)
}

export default exportUpload
