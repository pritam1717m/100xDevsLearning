import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from 'dotenv'

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()

const otpLlimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many requests, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const otpStore: Record<string, string> = {};

app.post("/generate-otp", otpLlimiter, async (req: Request, res: Response) => {
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

app.post(
  "/reset-password",
  passwordResetLimiter,
  async (req: Request, res: Response) => {
    const { email, otp, token } = await req.body;
    if (!email && !otp && !token) {
      res.status(401).json({
        message: "Email and OTP is required",
      });
    }
    let formData = new FormData();
    formData.append("secret", process.env.SECRET_KEY as string);
    formData.append("response", token as string);

    try {
      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const result = await fetch(url, {
        body: formData,
        method: "POST",
      });
      console.log(await result.json());

      const challengeSucceded = (await result.json()).success;
      if (!challengeSucceded) {
        res.status(403).json({ message: "Invalid reCAPTCHA token" });
      }
    } catch (e) {}

    if (otpStore[email] == otp) {
      delete otpStore[email];
      res.status(200).json({
        message: "Otp matched",
      });
    } else {
      res.json({
        message: "Opt does not matched",
      });
    }
  }
);

app.listen(3000, () => {
  console.log("Server is running...");
});
