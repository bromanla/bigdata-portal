import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    MailModule,
    UsersModule,
    AuthModule,
    TasksModule,
    DatabaseModule,
    ConfigurationModule,
  ],
})
export class AppModule {}
