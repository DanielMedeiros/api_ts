"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("./infra/db");
const bodyParser = require("body-parser");
const newsController_1 = require("./controller/newsController");
class StartUp {
    constructor() {
        this.app = express();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.send({ versao: "0.0.1", message: "API is running" });
        });
        this.app.route("/api/v1/news")
            .get(newsController_1.default.getAll)
            .post(newsController_1.default.create);
        this.app.route("/api/v1/news/:id")
            .get(newsController_1.default.getById)
            .put(newsController_1.default.update)
            .delete(newsController_1.default.delete);
    }
}
exports.default = new StartUp();
