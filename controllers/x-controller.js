const tryCatch = require("../utils/try-catch");

module.exports.upload = tryCatch( async (req, res) => {

	res.json({msg: 'upload...'})
} )