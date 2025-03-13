require('dotenv').config()
const prisma = new (require('@prisma/client')).PrismaClient()

// beware order of table to delete
async function resetDatabase() {
	await prisma.$transaction([
		prisma.user.deleteMany(),
	])
  await prisma.$executeRawUnsafe('Alter Table User auto_increment=1')
}

console.log('Reset DB...')
resetDatabase()