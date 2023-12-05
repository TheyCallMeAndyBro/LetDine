const { PutObjectCommand } = require("@aws-sdk/client-s3")

const awsS3FileHandler = (file) => {
  return new Promise(async (resolve, reject) => {
    if (!file) return resolve(null)

    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: `${Date.now().toString()}-${file.originalname}`,
      Body: fs.createReadStream(file.path),
      ACL: 'public-read',
    }

    try {
      const data = await s3Client.send(new PutObjectCommand(params))
      resolve(data.Location)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = awsS3FileHandler