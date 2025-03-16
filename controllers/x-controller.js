const jwt = require('jsonwebtoken')
const prisma = new (require('@prisma/client')).PrismaClient()
const bcrypt = require('bcryptjs')
const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch");

module.exports.login = tryCatch(async (req, res, next) => {
	const { username, password } = req.body
	// validation
	if (!username || !username.trim() || !password || !password.trim()) {
		createError(400, 'Please fill all data')
	}
	// find user
	const foundUser = await prisma.user.findFirst({
		where: { username }
	})

	if(!foundUser) {
		createError(401, 'Invalid Login')
	}

	// check password
	let pwOk = await bcrypt.compare(password, foundUser.password)
	if(!pwOk) {
		createError(401, 'Invalid Login')
	}

	// create jwt token

	const payload = { id: foundUser.id }
	const token = jwt.sign(payload, process.env.JWT_SECRET, { 
		expiresIn : '15d'
	})

	// delete foundUser.password
	const { password : pw, ...userData  } = foundUser

	res.json({ msg: 'Login successful', token: token, user: userData })
})

module.exports.profilePic = tryCatch( async (req, res) => {
	const {profileImage} = req.body

	const updateUser = await prisma.user.update({
		where: { id : req.user.id},
		data: { profileImage : profileImage}
	})

	res.json({msg: 'change profile image successfully', updateUser})
} )


