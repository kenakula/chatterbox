import { object, string } from 'yup';

export const editRoomSchema = object({
  name: string().max(40, 'Name should be less than 40 chars').required('Fill the name field'),
});
