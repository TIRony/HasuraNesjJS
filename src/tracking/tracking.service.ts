import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TrackingService {
  constructor(@Inject('PG_CONNECTION') private conn) {}

  async searchUsersInRadius(radius: number) {
    const { CENTER_LATITUDE, CENTER_LONGITUDE } = process.env;
    try {
      const result = await this.conn.query(
        `SELECT * from public.user, public.user_tracking
        WHERE public.user.id = public.user_tracking.user_id
        AND point(public.user_tracking.lat, public.user_tracking.lng) <@> point(${CENTER_LATITUDE}, ${CENTER_LONGITUDE}) < ${radius}`,
        [],
      );

      if (!result?.rows?.length) {
        return { error: 'No users found' };
      }

      return result.rows.map(({ first_name, last_name, gender, lat, lng }) => ({
        firstName: first_name,
        lastName: last_name,
        gender,
        lat,
        lng,
      }));
    } catch (e) {
      return { error: e.message };
    }
  }
}
