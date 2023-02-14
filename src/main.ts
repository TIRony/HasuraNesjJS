import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const { NODEJS_PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(NODEJS_PORT);
  console.log("Databse connected to " +NODEJS_PORT+ " port")
}
bootstrap();
