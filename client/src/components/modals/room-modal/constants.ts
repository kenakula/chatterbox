import { object, string } from 'yup';

import { IRoomModalForm } from '@components/modals/room-modal/interfaces';
import { IFormField } from '@shared/interfaces';

export const formSchema = object({
  name: string().max(30).required(),
  description: string().max(240),
});

export const formFields: IFormField<IRoomModalForm>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'input',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'input',
  },
];
