import express, { Request, Response } from "express";
import { runRound, cashOut } from "../../services/casino.service.js";

const router = express.Router();

declare module "express-session" {
  interface SessionData {
    isStarted: boolean;
    remainingCredits: number;
  }
}

router.post("/check-session", (req: Request, res: Response) => {
  try {
    res.json({
      isSessionInitialized: !!req.session.isStarted,
      remainingCredits: req.session.remainingCredits ?? 0,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.post("/start", (req: Request, res: Response) => {
  try {
    if (req.session.isStarted) {
      return res.status(400).json({
        error: {
          message: "Cannot restart game session that was already started",
        },
      });
    }
    req.session.isStarted = true;
    req.session.remainingCredits = 10;
    res.json({
      success: true,
      remainingCredits: req.session.remainingCredits,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.post("/roll", (req: Request, res: Response) => {
  try {
    if (!req.session.isStarted) {
      return res.status(400).json({
        error: {
          message: "No active game session. Please start a new game.",
        },
      });
    }
    const remainingCredits = req.session.remainingCredits ?? 0;
    if (remainingCredits <= 0) {
      return res.status(400).json({
        error: {
          message: "No credits left. Cannot play further.",
        },
      });
    }
    const result = runRound(remainingCredits);
    req.session.remainingCredits = result.remainingCredits;
    res.send(result);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.post("/cashout", (req: Request, res: Response) => {
  try {
    if (!req.session.isStarted) {
      return res.status(400).json({
        error: {
          message: "No active game session. Please start a new game.",
        },
      });
    }
    const remainingCredits = req.session.remainingCredits ?? 0;
    const result = cashOut(remainingCredits);
    req.session.remainingCredits = result.remainingCredits;
    res.json({
      remainingCredits: result.remainingCredits,
      cashedOutCredits: result.cashedOutCredits,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default router;
