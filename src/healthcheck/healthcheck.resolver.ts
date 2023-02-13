import { Field, ObjectType, Resolver, Query } from '@nestjs/graphql';

@ObjectType()
class HealthCheckOutput {
  @Field({ nullable: true })
  status?: string;
}

@Resolver()
export class HealthcheckResolver {
  @Query(() => HealthCheckOutput)
  health() {
    return { status: 'OK' };
  }
}
