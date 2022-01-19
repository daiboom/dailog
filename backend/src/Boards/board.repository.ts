import { EntityRepository, Repository } from 'typeorm'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'
import { Board } from './board.entity'
import { NotFoundException } from '@nestjs/common'
import { User } from 'src/auth/user.entity'

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoard(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board')
    query.where('board.userId = :userId', { userId: user.id })

    const boards = await query.getMany()
    return boards
  }

  async getBoardById(id: number) {
    const found = await this.findOne(id)

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    return found
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    })

    await this.save(board)
    return board
  }

  async deleteBoard(id: number, user: User) {
    const res = await this.delete({ id, user })
    if (res.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)
    board.status = status
    await this.save(board)

    return board
  }
}
