import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { SigninInput } from './signin.input';
import { SignupInput } from './signup.input';
import { AuthService } from './auth.service';

@ObjectType()
class AuthOutput {
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  error?: string;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => AuthOutput)
  async signin(@Args('signinInput') signinInput: SigninInput) {
    const response = await this.authService.login(signinInput);
    return response;
  }

  @Mutation(() => AuthOutput)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    const response = await this.authService.registerUser(signupInput);
    return response;
  }
}
