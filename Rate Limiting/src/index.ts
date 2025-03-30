
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const otpStore: Record<string, string> = {};

app.post("/generate-otp", async (req: Request, res: Response) => {
  const email = await req.body.email;
  if (!email) {
    res.status(401).send({
      message: "Please provide email",
    });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  console.log(`The OTP for ${email} is ${otp}`);
  res.status(200).send({
    message: "OTP logged to console",
  });
});

app.post("/reset-password", async (req: Request, res: Response) => {
  const { email, otp } = await req.body;
  if (!email) {
    res.status(401).json({
      message: "Email is required",
    });
  }
  if (otpStore[email] == otp) {
    res.status(200).json({
      message: "Otp matched",
    });
  } else {
    res.json({
        message: "Opt does not matched"
    })
  }
});

app.listen(3000, () => {
  console.log("Server is running...");
});
