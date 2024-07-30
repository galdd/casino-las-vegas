import express, { Router } from 'express';
import casinoRoutes from './features/casino.routes.js';


const router: Router = express.Router();

router.use('/api/casino', casinoRoutes);

export default router;
