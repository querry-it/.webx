import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';

const router = Router();

router.get('/search', LocationController.search);
router.get('/history/:userId', LocationController.getHistory);
router.post('/insert-history', LocationController.createHistory);
router.delete('/delete/:id', LocationController.deleteHistory);
router.get('/get-location/:locationId', LocationController.getLocation);
router.get('/:locationId/feedbacks', LocationController.getFeedbacks);
router.get('/all', LocationController.getAllLocations);
router.get('/category/:category', LocationController.getLocationsByCategory);
router.get('/history/all/:userId', LocationController.getAllHistory);
router.get('/search/:keyword', LocationController.getLocationByKeyword);
router.get('/reviews/:userId', LocationController.getReviewsByUserId);
router.get('/roadmap/:id', LocationController.getPoints);
router.get('/ids', LocationController.getAllIds);

export default router;
