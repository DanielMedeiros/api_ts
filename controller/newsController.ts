import newsService from "../services/newsService";
import * as HttpStatus from "http-status-codes";
import Helper from "../infra/helper"; // Assuming Helper is in the infra directory

class NewsController {


  async getAll(req, res) {
    try {
      const news = await newsService.getAllNews();
      Helper.sendResponse(res, HttpStatus.StatusCodes.OK, news);
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const news = await newsService.getNewsById(req.params.id);
      if (!news) {
        return Helper.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, { message: "News not found" });
      }
      Helper.sendResponse(res, HttpStatus.StatusCodes.OK, news);
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
    }
  }

    async create(req, res) {
        try {
        const news = await newsService.createNews(req.body);
        Helper.sendResponse(res, HttpStatus.StatusCodes.CREATED, news);
        } catch (error) {
        Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
        }
    }

    async update(req, res) {
        try {
        const news = await newsService.updateNews(req.params.id, req.body);
        if (!news) {
            return Helper.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, { message: "News not found" });
        }
        Helper.sendResponse(res, HttpStatus.StatusCodes.OK, news);
        } catch (error) {
        Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const news = await newsService.deleteNews(req.params.id);
            if (!news) {
                return Helper.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, { message: "News not found" });
            }
            Helper.sendResponse(res, HttpStatus.StatusCodes.OK, { message: "News deleted successfully" });
        } catch (error) {
            Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
        }
    }
}

export default new NewsController();
