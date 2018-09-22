import { join } from 'path';
import { getFileLastUpdated, nuxtpressConfig, mergeSourceOpts } from '../../src/lib/utils';

describe('lib/utils', () => {
  test('getFileLastUpdated', () => {
    expect(getFileLastUpdated(join(__dirname, '../../package.json'))).toBeGreaterThan(1e10);
    expect(getFileLastUpdated(join(__dirname, '../package.json'))).toBe(false);
  });

  test('nuxtpressConfig', () => {
    expect(() => {
      nuxtpressConfig();
    }).toThrowError();
    expect(nuxtpressConfig(join(__dirname, '../fixtures'))).toMatchObject(expect.any(Object));
    expect(nuxtpressConfig(join(__dirname, '../core'))).toBe(false);
  });

  test('mergeSourceOpts', () => {
    expect(mergeSourceOpts([['posts', {}]])).toMatchObject(expect.any(Object));
    expect(mergeSourceOpts(['posts'])).toMatchObject(expect.any(Object));
    expect(mergeSourceOpts({})).toMatchObject(expect.any(Object));
    expect(() => {
      mergeSourceOpts([['posts', {}], ['/', {}]]);
    }).toThrowError();
  });
});
