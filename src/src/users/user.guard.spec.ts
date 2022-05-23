import { UserGuard } from './user.guard';

describe('AuthUserGuard', () => {
  it('should be defined', () => {
    expect(new UserGuard()).toBeDefined();
  });
});
