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
  static async getAllLocations(req: Request, res: Response) {
    try {
      const locations = await LocationService.getAllLocations();
      return res.status(200).json({
        success: true,
        message: 'Lấy tất cả địa điểm thành công.',
        data: locations,
      });
    } catch (error) {
      console.error('[LocationController] getAllLocations error:', error);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
  }
  static async getLocationsByCategory(req: Request, res: Response) {
    try {
      const category = req.params.category as string;
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu category.',
        });
      }
      const locations = await LocationService.getLocationsByCategory(category);
      return res.status(200).json({
        success: true,
        message: 'Lấy địa điểm theo category thành công.',
        data: locations,
      });
    } catch (error) {
      console.error(
        '[LocationController] getLocationsByCategory error:',
        error,
      );
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
  }
  static async getAllHistory(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu userId trong URL params.',
        });
      }

      const histories = await LocationService.getAllHistory(userId);

      return res.status(200).json({
        success: true,
        message: 'Lấy lịch sử thành công',
        data: histories,
      });
    } catch (error) {
      console.error('getAllHistory error:', error);

      return res.status(500).json({
        success: false,
        message: 'Lỗi server.',
      });
    }
  }
  static async getLocationByKeyword(req: Request, res: Response) {
    try {
      const keyword = req.params.keyword;

      if (!keyword?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu keyword trong query params.',
        });
      }
      const locations = await LocationService.getLocationByKeyword(
        keyword.trim(),
      );
      return res.status(200).json({
        success: true,
        message: 'Tìm kiếm địa điểm thành công.',
        data: locations,
      });
    } catch (error) {
      console.error('getLocationByKeyword error:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi server.',
      });
    }
  }
  static async getReviewsByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const reviews = await LocationService.getReviewsByUserId(userId);
      res.status(200).json({
        success: true,
        message: 'Lấy dữ liệu thành công.',
        data: reviews,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Máy chủ mất kết nối.',
      });
    }
  }
}
