import { HasuraInsertEvent, TrackedHasuraEventHandler } from '@golevelup/nestjs-hasura';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthEventsService {
  // @TrackedHasuraEventHandler({
  //   schema: 'public',
  //   tableName: 'user',
  //   triggerName: 'user-created',
  //   definition: {
  //     type: 'insert',
  //   },
  // })
  // userCreated(evt) {
  //   console.log('User created', evt.event.data.new);
  // }
}