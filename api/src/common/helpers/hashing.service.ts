import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  public hashRounds = 10;

  async toHashed(value: string): Promise<string> {
    return bcrypt.hash(value, this.hashRounds);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
