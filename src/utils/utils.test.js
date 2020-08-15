import { sum, authRouterPass, isInArray, isUrl, calcLength } from './utils.js';
import { greeter } from './utils.ts';

/**
 * @desc sum
 */
test('sum: adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

/**
 * @desc greeter
 */
test('greeter: print obj { firstName: jack, lastName: kong }', () => {
  const user = { firstName: 'jack', lastName: 'kong' };
  expect(greeter(user)).toBe('Hello, jack kong');
});

/**
 * @desc authRouterPass
 */
test('authRouterPass : path auth filter', () => {
  const that = {
    props: {
      history: {
        location: {
          pathname: '/user/login'
        },
        push: newPath => {
          console.log(newPath);
          return newPath;
        }
      },
      globalModel: {
        baseRouterUrl: ['/', 'user/login', '/user']
      }
    }
  };
  expect(authRouterPass(that, '/user/login')).toBe(false);
  expect(authRouterPass(that, '/user')).toBe(true);
  expect(authRouterPass(that)).toBe(false);

  that.props.history.location.pathname = '/';
  expect(authRouterPass(that)).toBe(false);

  that.props.globalModel.baseRouterUrl = undefined;
  expect(authRouterPass(that, '/')).toBe(false);

  that.props.globalModel.baseRouterUrl = ['/', 'user/login', '/user'];
  that.props.history.location.pathname = 'user/login';
  expect(authRouterPass(that)).toBe(false);

  that.props.history.location.pathname = '/auth/exception/403';
  expect(authRouterPass(that)).toBe(false);

  that.props.history.location.pathname = undefined;
  expect(authRouterPass(that)).toBe(false);
});

/**
 * @desc isInArray
 */
test('isInArray: string in array', () => {
  const tempArray = ['/', 'user/login', '/user'];
  expect(isInArray(tempArray, '/')).toBe(true);
  expect(isInArray(tempArray, '/users')).toBe(false);
});

/**
 * @desc isUrl
 */
test('isUrl', () => {
  expect(isUrl('https://china.com')).toBe(true);
  expect(isUrl('china.com')).toBe(false);
  expect(isUrl('china.123.com')).toBe(false);
});

/**
 * @desc calcLength
 */
test('calcLength', () => {
  expect(calcLength('篮球')).toBe(6);
  expect(calcLength('12篮球')).toBe(8);
  expect(calcLength('')).toBe(0);
});
