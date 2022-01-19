import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './user.entity'
import { JwtService } from '@nestjs/jwt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hashedPassword })

    try {
      await this.save(user)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    jwtService: JwtService,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto
    const user = await this.findOne({ username })
    const isSame = await bcrypt.compare(password, user.password)

    if (user && isSame) {
      const payload = { username }
      const accessToken = await jwtService.sign(payload)
      return { accessToken }
    } else {
      throw new UnauthorizedException('login failed')
    }
  }
}
