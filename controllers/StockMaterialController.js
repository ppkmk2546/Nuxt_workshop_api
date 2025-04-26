const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.stockMaterial.create({
                data: {
                    materialId: req.body.material_id, // * เอามาจากหน้าบ้านตรง payload ที่เราตั้งไว้
                    quantity: req.body.quantity,
                    price: req.body.price,
                    remark: req.body.remark
                }
            })
            res.status(200).json({ message: 'success' }); // * ตรงส่ง res คืนค่า งั้น event จะ bug Modal ไม่ยอมปิด
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    list: async (req, res) =>  {
        try {
            const stockMaterials = await prisma.stockMaterial.findMany({
                include: {
                    Material: true // * join table material
                },
                orderBy: {
                    createdAt: 'desc' // * เรียงจากใหม่ไปเก่า
                }
            });
            res.status(200).json({ results: stockMaterials });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.stockMaterial.delete({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ message: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
}