import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as chalk from 'chalk';

const isEmpty: (obj: object) => boolean = (obj) => JSON.stringify(obj) === '{}';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  logger = new Logger('HTTP');
  log = (t: string, v?: any) =>
    v
      ? this.logger.log(`${chalk.cyan(t)} ${v}`)
      : this.logger.log(chalk.greenBright(t));

  use(req: any, _res: any, next: () => void) {
    const { body, query } = req;
    const requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    this.log('----------------------------------------------------');
    this.log('request method:', chalk.magenta(req.method));
    this.log('request url: ', chalk.yellow(requestUrl));

    if (query && !isEmpty(query)) {
      this.log('request query: ', chalk.red(JSON.stringify(query)));
    }
    if (body && !isEmpty(body)) {
      this.log('request body: ', chalk.blue(JSON.stringify(body)));
    }

    this.log('----------------------------------------------------');
    next();
  }
}
