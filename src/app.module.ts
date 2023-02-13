import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HasuraModule } from '@golevelup/nestjs-hasura';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TrackingModule } from './tracking/tracking.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true, driver: ApolloDriver }),
    HasuraModule.forRoot(HasuraModule, {
      webhookConfig: {
        secretFactory: 'webhooksecret',
        secretHeader: 'event-webhook',
      },
      managedMetaDataConfig: {
        dirPath: join(
          process.cwd(),
          'hasura/metadata/databases/default/tables',
        ),
        secretHeaderEnvName: 'secret',
        nestEndpointEnvName: 'SERVER_WEBHOOK_URL',
      },
    }),
    TrackingModule,
    AuthModule,
    DbModule,
    HealthcheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
