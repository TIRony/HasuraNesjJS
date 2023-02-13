import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'User Signup' })
export class SignupInput {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}
