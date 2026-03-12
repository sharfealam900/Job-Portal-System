import express from "express";
import Subscriber from "../models/subscriber.model.js";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = await Subscriber.create({ email });

    return res.status(201).json({
      message: "Subscribed successfully",
      subscriber: newSubscriber
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;