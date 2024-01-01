export const LoggerService = jest.fn().mockReturnValue({
  log: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
});
