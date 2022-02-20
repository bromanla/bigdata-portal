import { Controller, Post } from '@nestjs/common';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { RequestUser } from 'src/common/decorators/user-request.decorator';

@Controller('tasks')
export class TasksController {
  @Post()
  create(@RequestUser() user: JwtPayload) {
    console.log(user);
    return 'ok';
  }
}
