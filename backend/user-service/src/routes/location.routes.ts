// location.routes.ts
import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';

const router = Router();

router.get('/search', LocationController.search);
router.get('/history/:userId', LocationController.getHistory);
router.post('/insert-history', LocationController.createHistory);
router.delete('/delete/:id', LocationController.deleteHistory);
router.get('/get-location/:locationId', LocationController.getLocation);
router.get('/:locationId/feedbacks', LocationController.getFeedbacks);

export default router;
