import { PrismaClient } from '@prisma/client';
import express from 'express'

const app = express();

app.use(express.json())

const prisma = new PrismaClient();

app.get("/", (req, res) => {
    res.json({message : "huii"});
})

app.post("/sign",async  (req, res) => {
    const body = req.body;
    console.log(body)
    const user = await prisma.user.create({
        data : {
            name : body.name,
            email : body.email
        }
    })
    res.json({user})
})

app.listen(3000, () => {
    console.log("Server running...");
})