const prisma = new (require('@prisma/client')).PrismaClient()
const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('123456', 10)

const userData = [
	{
		username: 'Andy',  password: hashedPassword,
		profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg'
	},
	{
		username: 'Bobby',  password: hashedPassword,
		profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'
	},
	{
		username: 'Candy',  password: hashedPassword,
		profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'
	},
	{
		username: 'Danny',  password: hashedPassword,
		profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'
	},
]


console.log('DB seed...')

async function seedDB() {
	await prisma.user.createMany({ data: userData})
}

seedDB()