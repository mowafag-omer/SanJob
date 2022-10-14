import { Application } from 'express'
import { DataSource } from 'typeorm';
import config  from "./constants";


class Server {
  app: Application
  constructor(app: Application) {
    this.app = app;
  }

  async connecte(db: DataSource) {
    try {
      await db.initialize()
      console.log('[App]: Connected to the database');
    } catch (err) {
      console.log(err);
    }
  }

  middlewares(middlewares: any) {
    for (const key in middlewares) {
      this.app.use(middlewares[key]);
    }
  }

  routes(routes: any) {
    for (const path in routes) {
      this.app.use(`${config.API_VERSION}${path}`, routes[path]);
    }
  }

  errorHandler(errorHandler: any) {
    this.app.use(errorHandler);
  }

  start(port: number | string) {
    this.app.listen(port, () => {
      console.log(`[App]: Listening on port ${port}`);
    });
  }
}

export default Server;
