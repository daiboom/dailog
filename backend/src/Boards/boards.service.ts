import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardStatus } from 'src/Boards/board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { Board } from './board.entity'
import { BoardRepository } from './board.repository'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards()
  }

  async getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id)
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto)
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    return this.boardRepository.updateBoardStatus(id, status)
  }

  async deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id)
  }
}
