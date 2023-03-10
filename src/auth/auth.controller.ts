import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginUserArgs, SignupInput } from './auth.service';
// import { SignupInput } from './signup.input';

interface HasuraActionsPayload<Input extends {} = {}, Session extends {} = {}> {
  action: {
    name: string;
  };
  input: Input;
  session_variables: Session;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(
    @Body() payload: HasuraActionsPayload<{ params: LoginUserArgs }>,
  ) {
    const { input } = payload;

    return this.authService.login(input.params);
  }

  @Post('/register')
  async register(
    @Body() payload: HasuraActionsPayload<{ params: SignupInput }>,
  ) {
    const { input } = payload;

    return this.authService.registerUser(input.params);
  }
}