import { ConsentEvent } from './event';

export interface ConsentEventRepository {
  create(ConsentEvent: ConsentEvent): Promise<ConsentEvent>;
}
