import { v4 } from 'uuid';

export class GenerateUuidHelper {
  static get generate(): string {
    return v4();
  }
}
