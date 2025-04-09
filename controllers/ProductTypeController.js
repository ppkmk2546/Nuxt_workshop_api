const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.productType.create({
                data: {
                    name: req.body.name,
                    remark: req.body.remark,
                }
            });
            res.send({ message: 'Product Type created successfully' });

        } catch (error) {
            res.status(500).json({ message: error.message });

        }
    }
}