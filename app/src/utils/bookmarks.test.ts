import { bookmarkUri, bookmarkTitle } from './bookmarks';

describe(bookmarkUri.name, () => {
  it('returns null when invalid url', () => {
    expect(bookmarkUri({ uri: '' })).toEqual(null);
    expect(bookmarkUri({ uri: 'invalid' })).toEqual(null);
  });

  it('returns URI when valid', () => {
    expect(bookmarkUri({ uri: 'https://site.com' })).toEqual(
      'https://site.com',
    );
    expect(bookmarkUri({ uri: '/Users/test.png' })).toEqual('/Users/test.png');
  });

  it('handles spaces', () => {
    expect(bookmarkUri({ uri: 'Personal Site https://site.com' })).toEqual(
      'https://site.com',
    );
    expect(bookmarkUri({ uri: 'Test File /Users/test.png' })).toEqual(
      '/Users/test.png',
    );
  });

  it('handles file path with spaces', () => {
    expect(bookmarkUri({ uri: '/file/path with spaces.png' })).toEqual(
      '/file/path with spaces.png',
    );
    expect(
      bookmarkUri({ uri: 'spaces before /file/path with spaces.png' }),
    ).toEqual('/file/path with spaces.png');
  });
});

describe(bookmarkTitle.name, () => {
  it('renders text', () => {
    expect(bookmarkTitle('text')).toEqual('text');
  });

  it('renders URI', () => {
    expect(bookmarkTitle('https://site.com')).toEqual('https://site.com');
    expect(bookmarkTitle('https://localhost')).toEqual('https://localhost');
    expect(bookmarkTitle('/Users/test.png')).toEqual('/Users/test.png');
  });

  it('hides URI when title is present', () => {
    expect(bookmarkTitle('Some Title https://site.com')).toEqual(
      'Some Title ↗️',
    );
    expect(bookmarkTitle('Some Title https://localhost')).toEqual(
      'Some Title ↗️',
    );
    expect(bookmarkTitle('Some Title /Users/test.png')).toEqual(
      'Some Title ↗️',
    );
  });

  it('handles file path with spaces', () => {
    expect(bookmarkTitle('spaces before /file/path with spaces.png')).toEqual(
      'spaces before ↗️',
    );
  });
});
