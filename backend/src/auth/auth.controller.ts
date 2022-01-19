import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from 'src/auth/auth.service'
import { AuthCredentialsDto } from 'src/auth/dto/auth-credential.dto'
import { GetUser } from './get-user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCrendentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCrendentialsDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user) {
    console.log('user', user)
  }
}
