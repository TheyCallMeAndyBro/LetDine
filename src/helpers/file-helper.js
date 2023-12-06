const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const iconv = require('iconv-lite')
const crypto = require('crypto')

const randomImgName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const s3 = new S3Client({    //用來認證
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION
})

const awsS3FileHandler = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)

    const fileName = iconv.decode(file.originalname, 'utf-8') // 如果想知道檔案於本名稱是甚麼
    const imgName = randomImgName()
    // 使用原始檔名作為 S3 的 Key
    const params = {
      Bucket: process.env.BUCKET,
      Key: `img/${imgName}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }

    s3.send(new PutObjectCommand(params))

      .then(() => {
        const getObjectParams = {
          Bucket: process.env.BUCKET,
          Key: `img/${imgName}`,
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = getSignedUrl(s3, command, { expiresIn: 7 * 24 * 60 * 60 }) //一星期過期
        return url
      })
      .then(url => resolve(url))
  })
    .catch((err) => {
      console.error('Error:', err)
      reject(err)
    })
}

module.exports = {
  awsS3FileHandler,
}
