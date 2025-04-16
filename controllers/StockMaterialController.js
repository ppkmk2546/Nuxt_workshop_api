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
            res.status(200).json({ message: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}