import { Inject, Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
// import { SignupInput } from './signup.input';

export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  firstName: String;
  lastName: String;
}

export interface LoginOrRegisterUserOutput {
  token?: string;
  error?: string;
}

export type HasuraJwtClaims<
  CustomClaims extends Record<string, string | string[]> = {},
> = {
  'https://hasura.io/jwt/claims': {
    'x-hasura-default-role': string;
    'x-hasura-allowed-roles': string[];
  } & CustomClaims;
};

export type UserJwtClaims = HasuraJwtClaims<{ 'x-hasura-user-id': string }>;

@Injectable()
export class AuthService {
  constructor(
    @Inject('PG_CONNECTION') private conn,
    private readonly jwtService: JwtService,
  ) {}

  public async login(args: LoginUserArgs): Promise<LoginOrRegisterUserOutput> {
    const { email, password } = args;
    const hashedPassword = md5(password);

    const result = await this.conn.query(
      `SELECT * FROM public.user WHERE email = $1 AND password = $2`,
      [email, hashedPassword],
    );

    const foundUser = result?.rows?.[0];

    if (!foundUser) {
      return {
        error: `Failed to login invalid email or password`,
      };
    }

    const token = await this.signHasuraToken(foundUser.id);

    return {
      token,
    };
  }

  public async registerUser(
    args: SignupInput,
  ): Promise<LoginOrRegisterUserOutput> {
    const { email, password, firstName, lastName } = args;

    console.log({ email });
    try {
      const hashedPassword = md5(password);

      const result = await this.conn.query(
        `INSERT INTO public.user(email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *`,
        [email, hashedPassword, firstName, lastName],
      );

      const user = result?.rows?.[0];

      const { id } = user;

      const token = await this.signHasuraToken(id);
      console.log({ token });
      return {
        token,
      };
    } catch (e) {
      console.error({ e });
      const error = (e?.message as string)?.includes(
        'unique constraint "user_email_key"',
      )
        ? 'That email address is already registered'
        : 'Something unexpected happened. Please try again later';

      console.log(error);
      return {
        error,
      };
    }
  }

  private signHasuraToken(userId: number) {
    const payload: UserJwtClaims = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': String(userId),
      },
    };

    return this.jwtService.signAsync(payload, { expiresIn: '1d' });
  }
}
