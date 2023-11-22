const multer = require('multer')
const upload = multer({ dest: 'src/temp/' }) // dest: 'temp/' 暫時存到temp file裡面

module.exports = upload