import { Logger } from '@nestjs/common'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { CreateBoardDto } from 'src/Boards/dto/create-board.dto'
import { BoardStatusValidationPipe } from './board-status-validation.pipe'
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity'
import { BoardsService } from './boards.service'

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController')
  constructor(private boardService: BoardsService) {}
  @Get()
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`)
    return this.boardService.getAllBoard(user)
  }

  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board. Payload: ${createBoardDto.title} ${createBoardDto.description}`,
    )
    return this.boardService.createBoard(createBoardDto, user)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status)
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoard(id, user)
  }
}
