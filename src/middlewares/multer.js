const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

const awsS3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-s3-bucket-name',
    acl: 'public-read', // 設置文件權限
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
  })
})

module.exports = awsS3Upload