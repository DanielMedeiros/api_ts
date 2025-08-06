"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsRepository_1 = __importDefault(require("../repository/newsRepository"));
class NewsService {
    getAllNews() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.find({});
        });
    }
    getNewsById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.findById(_id);
        });
    }
    createNews(newsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = new newsRepository_1.default(newsData);
            return yield news.save();
        });
    }
    updateNews(_id, newsData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.findByIdAndUpdate(_id, newsData, { new: true });
        });
    }
    deleteNews(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield newsRepository_1.default.findByIdAndDelete(_id);
        });
    }
}
exports.default = new NewsService();
