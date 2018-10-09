import utils from '../utils';

it('returns false for a null email address', () => {
  let isValid = utils.isValidEmailAddress(null);
  expect(isValid).toEqual(false);
});