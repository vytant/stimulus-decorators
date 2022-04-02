import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should return a string with a first symbol in uppercase when a string with a first symbol in lowercase is provided', () => {
    expect(capitalize('test')).toEqual('Test');
  });

  it('should return a string with a first symbol in uppercase when a string with a first symbol in uppercase is provided', () => {
    expect(capitalize('Test')).toEqual('Test');
  });

  it('should return an empty string when an empty string is provided', () => {
    expect(capitalize('')).toEqual('');
  });
});
