import src from '../src';

describe('lib tests', () => {
  it('should export the string "foo"', () => {
    expect(src).to.equal('foo');
  });
});
