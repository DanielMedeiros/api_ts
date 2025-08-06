"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const newsService_1 = __importDefault(require("../services/newsService"));
const HttpStatus = __importStar(require("http-status-codes"));
const helper_1 = __importDefault(require("../infra/helper")); // Assuming Helper is in the infra directory
class NewsController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsService_1.default.getAllNews();
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.OK, news);
            }
            catch (error) {
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsService_1.default.getNewsById(req.params.id);
                if (!news) {
                    return helper_1.default.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, { message: "News not found" });
                }
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.OK, news);
            }
            catch (error) {
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsService_1.default.createNews(req.body);
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.CREATED, news);
            }
            catch (error) {
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsService_1.default.updateNews(req.params.id, req.body);
                if (!news) {
                    return helper_1.default.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, { message: "News not found" });
                }
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.OK, news);
            }
            catch (error) {
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield newsService_1.default.deleteNews(req.params.id);
                if (!news) {
                    return helper_1.default.sendResponse(res, HttpStatus.StatusCodes.NOT_FOUND, { message: "News not found" });
                }
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.OK, { message: "News deleted successfully" });
            }
            catch (error) {
                helper_1.default.sendResponse(res, HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { message: error.message });
            }
        });
    }
}
exports.default = new NewsController();
