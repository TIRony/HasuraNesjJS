import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'User Signin' })
export class SigninInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
