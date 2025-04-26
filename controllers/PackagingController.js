const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.packaging.create({
                data: req.body
            });

            res.status(200).json({message: 'success'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    list: async (req, res) => {
        try {
            const packagings = await prisma.packaging.findMany({
                where: {
                    status: 'active'
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            res.status(200).json({ results: packagings });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.packaging.update({
                where: {
                    id: req.params.id
                },
                data: {
                    status: 'inactive'
                }
            });

            res.status(200).json({message: 'success'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    update: async (req, res) => {
        try {
            await prisma.packaging.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            });

            res.status(200).json({message: 'success'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}