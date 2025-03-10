import express, { Request, Response } from 'express'

const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.json({
        message : "HEllo"
    })
})

app.listen(3000, () => {
    console.log("Server started...")
})