import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateBoardDto } from 'src/Boards/dto/create-board.dto'
import { BoardStatusValidationPipe } from './board-status-validation.pipe'
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity'
import { BoardsService } from './boards.service'

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards()
  }

  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    console.log(createBoardDto)
    return this.boardService.createBoard(createBoardDto)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status)
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoard(id)
  }
}
