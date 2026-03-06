// location.controller.ts
import { Request, Response } from 'express';
import { LocationService } from '../services/location.service';

export class LocationController {
  static async search(req: Request, res: Response) {
    try {
      const keyword = req.query.q as string;

      if (!keyword?.trim()) {
        res.json({ success: true, data: [] });
        return;
      }

      const results = await LocationService.searchLocation(keyword);
      res.json({ success: true, data: results });
    } catch (err) {
      console.error('[LocationController] search error:', err);
      res.status(500).json({ success: false, message: 'Lỗi tìm kiếm' });
    }
  }
  static async getHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const result = await LocationService.getHistory(userId);

      return res.status(200).json({
        success: true,
        message: 'Lấy lịch sử thành công',
        data: result.histories,
        pagination: {
          total: result.total,
        },
      });
    } catch (error: any) {
      if (error.message === 'Không có lịch sử.') {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    }
  }
  static async createHistory(req: Request, res: Response) {
    try {
      const { userId, query, locationId } = req.body;

      const result = await LocationService.createHistory(
        userId,
        query,
        locationId,
      );

      return res.status(201).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async deleteHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await LocationService.deleteHistory(id);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getLocation(req: Request, res: Response) {
    try {
      const { locationId } = req.params;

      if (!locationId) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu locationId.',
        });
      }

      const location = await LocationService.getLocation(locationId);

      return res.status(200).json({
        success: true,
        message: 'Lấy thông tin địa điểm thành công.',
        data: location,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || 'Địa điểm không tồn tại.',
      });
    }
  }
  static async getFeedbacks(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      const userId: string | null = (req.query.userId as string) ?? null;

      const data = await LocationService.getFeedbacks(locationId, userId);

      if (!data) {
        return res.status(404).json({ message: 'Location not found' });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('[FeedbackController.getFeedbacks]', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
