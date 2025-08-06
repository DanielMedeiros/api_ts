import * as express from "express";
import Database from "./infra/db";
import * as bodyParser from "body-parser";
import NewsController from "./controller/newsController";
import * as cors from "cors";
import Auth from "./infra/auth";

class StartUp {
  public app: express.Application;
  private _db: Database;

  constructor() {
    this.app = express();
    this._db = new Database();
    this._db.createConnection();
    this.middlewares();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      origin: "*", // Allow all origins
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    this.app.use(cors(options));
  }

  middlewares() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(Auth.validate);

    this.app.get("/", (req, res) => {
      res.send({ versao: "0.0.1", message: "API is running" });
    });

    this.app.use(Auth.validate);

    this.app.route("/api/v1/news")
      .get(NewsController.getAll)
      .post(NewsController.create);

    this.app.route("/api/v1/news/:id")
      .get(NewsController.getById)
      .put(NewsController.update)
      .delete(NewsController.delete);
  }
}

export default new StartUp();