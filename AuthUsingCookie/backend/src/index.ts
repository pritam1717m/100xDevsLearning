import express from "express"
import cors from  'cors'
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials : true,
    origin: "http://localhost:5173"
}))

app.post('/signin', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign(email, process.env.JWT_SECRET as string)
    res.cookie("token", token)
    res.send("Logged in")
})

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    res.send({
        userId: decoded
    })
});


app.post("/logout", (req, res) => {
    res.clearCookie("token")
    res.cookie("token", "");
    res.json({
        message: "Logged out!"
    })
});


app.listen(3000);