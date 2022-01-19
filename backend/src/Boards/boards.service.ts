import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardStatus } from 'src/Boards/board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { Board } from './board.entity'
import { BoardRepository } from './board.repository'
import { User } from 'src/auth/user.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  async getAllBoard(user: User): Promise<Board[]> {
    return this.boardRepository.getAllBoard(user)
  }

  async getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id)
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    return this.boardRepository.updateBoardStatus(id, status)
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoard(id, user)
  }
}
