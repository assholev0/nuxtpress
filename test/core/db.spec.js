import { db } from '../util';

describe('db', () => {
  test('createDatabase', () => {
    db('/Users/willin/Documents/websites/v0.chat/_source', 'demo');
    expect(true).toBe(true);
  });
});
