import { join } from 'path';
import { page } from '../util';

describe('core/page', () => {
  test('getPage', () => {
    const lazyPage = page({
      fileName: 'page.md',
      filePath: join(__dirname, './fixtures/page.md')
    });
    expect(lazyPage).toMatchSnapshot();
  });
});
