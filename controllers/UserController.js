const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    signIn: async (req, res) => {
        try{
            req.body.username = req.body.username.trim();
            req.body.password = req.body.password.trim();

            if (!req.body.username || !req.body.password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            const user = await prisma.user.findFirst({
                where: {
                    username: req.body.username,
                    password: req.body.password,
                    status: 'active',
                }
            });

            if(!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // ? payload เอาไปทำ JWT token
            const payload = {
                id: user.id,
                username: user.username,
            }

            const key = process.env.SECRET_KEY;
            const token = jwt.sign(payload, key, { expiresIn: '30d' }); // 30 days

            res.json({ token: token, level: user.level, id: user.id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    info: async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            const user = await prisma.user.findUnique({
                select: {
                    name: true,
                    username: true,
                    level: true,
                },
                where: {
                    id: payload.id
                }
            });
            res.json({ result: user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            let oldPassword = '';

            // * ถ้าเขากรอก password ให้เอาค่าใหม่
            if (req.body.password){
                oldPassword = req.body.password;
            // * ถ้าไม่กรอก เอา password ตามเดิม
            } else {
                const oldUser = await prisma.user.findUnique({
                    where: {
                        id: payload.id
                    }
                });

                oldPassword = oldUser.password;
            }

            await prisma.user.update({
                where: {
                    id: payload.id
                },
                data: {
                    name: req.body.name,
                    username: req.body.username,
                    level: req.body.level,
                    password: oldPassword,
                },
            });

            res.json({ message: 'success'});
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    }
};