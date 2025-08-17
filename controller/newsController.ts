import newsService from "../services/newsService";
import * as HttpStatus from "http-status-codes";
import Helper from "../infra/helper";
import * as redis from "redis";

class NewsController {
  async getAll(req, res) {
    let client = redis.createClient({ socket: { port: 6379, host: 'redis' } });

    await client.connect();
    try {
      const reply = await client.get("news");

      if (reply) {
        Helper.sendResponse(
          res,
          HttpStatus.StatusCodes.OK,
          JSON.parse(typeof reply === "string" ? reply : reply.toString())
        );
      } else {
        const news = await newsService.getAllNews();
        await client.set("news", JSON.stringify(news));
        await client.expire("news", 30); // Set expiration time to 30 seconds
        Helper.sendResponse(res, HttpStatus.StatusCodes.OK, news);
      }
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, {
        message: error.message,
      });
    } finally {
      await client.disconnect();
    }

    // } catch (error) {
    //   Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
    // }
  }

  async getById(req, res) {
    try {
      const news = await newsService.getNewsById(req.params.id);
      if (!news) {
        return Helper.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, {
          message: "News not found",
        });
      }
      Helper.sendResponse(res, HttpStatus.StatusCodes.OK, news);
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, {
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const news = await newsService.createNews(req.body);
      Helper.sendResponse(res, HttpStatus.StatusCodes.CREATED, news);
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, {
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const news = await newsService.updateNews(req.params.id, req.body);
      if (!news) {
        return Helper.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, {
          message: "News not found",
        });
      }
      Helper.sendResponse(res, HttpStatus.StatusCodes.OK, news);
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, {
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const news = await newsService.deleteNews(req.params.id);
      if (!news) {
        return Helper.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, {
          message: "News not found",
        });
      }
      Helper.sendResponse(res, HttpStatus.StatusCodes.OK, {
        message: "News deleted successfully",
      });
    } catch (error) {
      Helper.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, {
        message: error.message,
      });
    }
  }
}

export default new NewsController();
