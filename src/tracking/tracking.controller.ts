import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('/findUsers')
  @HttpCode(200)
  async findUsers(
    @Body()
    {
      input: {
        arg: { radius },
      },
    },
  ) {
    const response = await this.trackingService.searchUsersInRadius(radius);

    return response;
  }
}
