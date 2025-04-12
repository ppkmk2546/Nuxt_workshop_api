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
    },
    list: async (req, res) => {
        try {
            const productTypes = await prisma.productType.findMany({
                where: {
                    status: 'active',
                },
                orderBy: {
                    createdAt: 'desc', // !  ยังไม่แน่ใจ
                }
            });
            res.json( { results: productTypes });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            await prisma.productType.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    name: req.body.name,
                    remark: req.body.remark,
                }
            });
            res.send({ message: 'success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.productType.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    status: 'inactive',
                }
            });

            res.send({ message: 'success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}