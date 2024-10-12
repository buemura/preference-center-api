import { ConsentEvent } from '../entities';

export interface ConsentEventRepository {
  create(ConsentEvent: ConsentEvent): Promise<ConsentEvent>;
}
