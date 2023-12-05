const { S3Client, Upload } = require("@aws-sdk/client-s3")


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
})

const awsS3Upload = (fieldName) => {
  return Upload({
    client: s3Client,
    params: {
      Bucket: 'your-s3-bucket-name',
      Key: function (file) {
        return `${Date.now().toString()}-${file.originalname}`
      },
      ACL: 'public-read',
      Body: fs.createReadStream(fieldName.path), // 使用 fs.createReadStream
      ContentType: fieldName.mimetype,
    }
  })
}

module.exports = awsS3Upload