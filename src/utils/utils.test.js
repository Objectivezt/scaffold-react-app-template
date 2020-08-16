import {
  sum,
  authRouterPass,
  isInArray,
  isUrl,
  calcLength,
  createBaseColumns,
  createFormRulesRequire,
  getRelation,
  formatterMenu,
  getBashRedirect,
  getRenderArr,
  getRoutes,
  loadFile,
  debounce,
  moneyExhibition,
  timeExhibition,
  getPlainNode,
  routerGoBack,
  getApiMethod,
  uniqId,
  formatNum,
  numFixed,
  formatNumDec,
  getter,
  divideNumber,
  parserFormatter,
  patternNumberWord,
  ellipsisTitle,
  getTrimValue,
  patternString,
  formatStringByType,
  fixedZero,
  getTimeDistance,
  digitUppercase,
  thousandsFormatter,
  parserSemicolon,
  patternSpString,
  supportEncrypt,
  toDate
} from './utils.js';
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

/**
 * @description createBaseColumns
 */
test('createBaseColumns', () => {
  expect(createBaseColumns('中文', 'key')).toStrictEqual({
    algin: 'center',
    dataIndex: 'key',
    key: 'key',
    title: '中文'
  });
});

/**
 * @description createFormRulesRequire
 */
test('createFormRulesRequire', () => {
  expect(createFormRulesRequire('文本')).toStrictEqual({
    required: true,
    message: '请输入文本'
  });
});

/**
 * @description getRelation
 */
test('getRelation', () => {
  // TODO
});

/**
 * @description formatterMenu
 */
test('formatterMenu', () => {
  // TODO
});

/**
 * @description getBashRedirect
 */
test('getBashRedirect', () => {
  // TODO
});

/**
 * @description getRenderArr
 */
test('getRenderArr', () => {
  // TODO
});

/**
 * @description getRoutes
 */
test('getRoutes', () => {
  // TODO
});

/**
 * @description loadFile
 */
test('loadFile', () => {
  // TODO
});

/**
 * @description debounce
 */
test('debounce', () => {
  // TODO
});

/**
 * @description moneyExhibition
 */
test('moneyExhibition', () => {
  // TODO
});

/**
 * @description timeExhibition
 */
test('timeExhibition', () => {
  // TODO
});

/**
 * @description getPlainNode
 */
test('getPlainNode', () => {
  // TODO
});

/**
 * @description routerGoBack
 */
test('routerGoBack', () => {
  // TODO
});

/**
 * @description getApiMethod
 */
test('getApiMethod', () => {
  // TODO
});

/**
 * @description uniqId
 */
test('uniqId', () => {
  // TODO
});

/**
 * @description formatNum
 */
test('formatNum', () => {
  // TODO
});

/**
 * @description numFixed
 */
test('numFixed', () => {
  // TODO
});

/**
 * @description formatNumDec
 */
test('formatNumDec', () => {
  // TODO
});

/**
 * @description getter
 */
test('getter', () => {
  // TODO
});

/**
 * @description divideNumber
 */
test('divideNumber', () => {
  // TODO
});

/**
 * @description parserFormatter
 */
test('parserFormatter', () => {
  // TODO
});

/**
 * @description patternNumberWord
 */
test('patternNumberWord', () => {
  // TODO
});

/**
 * @description ellipsisTitle
 */
test('ellipsisTitle', () => {
  // TODO
});

/**
 * @description getTrimValue
 */
test('getTrimValue', () => {
  // TODO
});

/**
 * @description patternString
 */
test('patternString', () => {
  // TODO
});

/**
 * @description formatStringByType
 */
test('formatStringByType', () => {
  // TODO
});

/**
 * @description fixedZero
 */
test('fixedZero', () => {
  // TODO
});

/**
 * @description getTimeDistance
 */
test('getTimeDistance', () => {
  // TODO
});

/**
 * @description digitUppercase
 */
test('digitUppercase', () => {
  // TODO
});
/**
 * @description thousandsFormatter
 */
test('thousandsFormatter', () => {
  // TODO
});
/**
 * @description parserSemicolon
 */
test('parserSemicolon', () => {
  // TODO
});
/**
 * @description patternSpString
 */
test('patternSpString', () => {
  // TODO
});

/**
 * @description supportEncrypt
 */
test('supportEncrypt', () => {
  // TODO
});

/**
 * @description  toDate
 */
test('toDate', () => {
  // TODO
});
