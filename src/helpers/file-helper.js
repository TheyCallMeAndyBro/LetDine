const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

const awsS3FileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)

    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `${Date.now().toString()}-${file.originalname}`,
      Body: fs.createReadStream(file.path),
      ACL: 'public-read' // 设置文件权限
    }

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Location)
      }
    })
  })
}

module.exports = awsS3FileHandler