import { IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  service_provider_id: string;
}
