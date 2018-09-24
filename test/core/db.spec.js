import { join } from 'path';
import { db } from '../util';

describe('db', () => {
  test('createDatabase', () => {
    db(join(__dirname, '../fixtures'), 'posts');
    expect(true).toBe(true);
  });
});
