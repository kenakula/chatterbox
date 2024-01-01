import { object, ref, string } from 'yup';

export const signinSchema = object({
  username: string().max(40, 'Name should be less than 40 chars').required('Fill the username'),
  password: string().min(6, 'Password should be more than 6 chars').required('Fill the password'),
  passwordConfirm: string().oneOf([ref('password')], 'Passwords must match').required('Confirm password'),
});
