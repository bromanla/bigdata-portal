import { Body, Controller, Post } from '@nestjs/common';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { RequestUser } from 'src/common/decorators/user-request.decorator';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @RequestUser() user: JwtPayload,
  ) {
    // TODO: crud
    return 'ok';
  }
}
