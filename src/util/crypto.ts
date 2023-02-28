import crypto from 'crypto'

const returnHashString = (strToHash: string) => {
  const sha256Hasher = crypto.createHmac('sha256', process.env.NEXTAUTH_SECRET || '')
  const hashString = sha256Hasher.update(strToHash).digest('hex')
  return hashString
}

export default returnHashString