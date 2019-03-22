import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as fs from 'fs';
import * as YAML from 'yamljs';

// TODO: expose this as a constant
export const config = YAML.parse(fs.readFileSync(`../config.yml`).toString());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
