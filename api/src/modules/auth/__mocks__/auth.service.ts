export const AuthService = jest.fn().mockReturnValue({
  validate: jest.fn(),
  login: jest.fn().mockReturnValue({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
});
