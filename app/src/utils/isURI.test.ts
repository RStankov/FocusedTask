import isURI from './isURI';

describe(isURI.name, () => {
  it('handles web urls', () => {
    expect(isURI('https://rstankov.com')).toEqual(true);
    expect(isURI('https://rstankov.com/about')).toEqual(true);
    expect(isURI('https://blog.rstankov.com/about')).toEqual(true);
  });

  it('handles localhost', () => {
    expect(isURI('https://localhost')).toEqual(true);
  });

  it('handles x-callbacks', () => {
    expect(isURI('bear://x-callback-url/open-note?id=12345')).toEqual(true);
  });

  it('handles files', () => {
    expect(isURI('/Users/rstankov/Desktop/test.png')).toEqual(true);
    expect(isURI('/Users/rstankov/Desktop/test with space.png')).toEqual(true);
  });

  it('handles invalid', () => {
    expect(isURI('')).toEqual(false);
    expect(isURI('invalid')).toEqual(false);
    expect(isURI('https://a')).toEqual(false);
    expect(isURI('https://a.com bsdadasdas')).toEqual(false);
  });
});
