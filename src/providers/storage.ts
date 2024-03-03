import { S3Client } from '@aws-sdk/client-s3'
import ENVIRONMENT from '../util/environments'

const S3 = new S3Client({
  region: 'auto',
  endpoint: ENVIRONMENT.CLOUDFARE_R2_URI,
  credentials: {
    accessKeyId: ENVIRONMENT.CLOUDFARE_ID,
    secretAccessKey: ENVIRONMENT.CLOUDFARE_SECRET,
  },
})

export default S3
