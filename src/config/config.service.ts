import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();
    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }
  public async getPortCongig() {
    return this.get('PORT');
  }

  public async getMongoConfig() {
    return {
      uri: this.get('MONGO_HOST'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}

// return {
//   uri:
//     'mongodb+srv://' +
//     this.get('MONGO_USER') +
//     ':' +
//     this.get('MONGO_PASSWORD') +
//     '@' +
//     this.get('MONGO_HOST') +
//     '/' +
//     this.get('MONGO_DATABASE'),
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// }
