import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RequestUser } from 'src/common/decorators/user-request.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Public()
  @Get('types')
  async taskTypes() {
    return await this.tasksService.findAllTaskTypes();
  }

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @RequestUser() user: JwtPayload,
  ) {
    return 'ok';
  }
}
