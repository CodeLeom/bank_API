import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import errorhandler from 'errorhandler';

import { __prod__ } from 'constants/index';
import routes from 'routes/index';
import database from 'database/index';
import logger from 'utils/logger';

export default class Application {
  constructor() {
    this.app = express();
  }

  connectDB = () => {
    database.connectWithRetry();
  };

  init = () => {
    try {
      const PORT = process.env.PORT || 4000;

      this.app.disable('x-powered-by');
      this.app.enable('trust proxy');
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.static('public'));
      this.app.use(cookieParser());
      this.app.use(compression());
      this.app.use(morgan('dev'));

      if (!__prod__) {
        this.app.use(errorhandler());
      }

      // catch invalid JSON payloads
      this.app.use((_err, _req, _res, _) => {
        if (_err instanceof SyntaxError) {
          _res.status(400).json({
            status: 'error',
            message: 'Invalid JSON payload passed.',
            data: null,
          });
        }
      });

      this.app.use(routes);

      if (!__prod__) {
        this.app.use((_err, _req, _res, _) => {
          logger.error(_err.stack);
          _res.status(500).json({
            errors: {
              message: _err.message,
              error: _err,
            },
          });
        });
      }

      this.app.listen(PORT, () => {
        console.log(`server started on PORT ${PORT}`);
      });
    } catch (error) {
      console.error('📌 Could not start server', error);
    }
  };
}
