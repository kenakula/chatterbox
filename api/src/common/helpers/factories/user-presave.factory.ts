import * as bcrypt from 'bcrypt';

import { UserSchema } from '@modules/users/entities';

export const userPresaveFactory = async () => {
  const schema = UserSchema;
  schema.pre('save', function () {
    if (this.isNew) {
      console.log('hello from factory');
      this.password = bcrypt.hashSync(this.password, 10);
    }
  });

  return schema;
};
