/*
 * @Author: objectivezt
 * @Date: 2018-08-15 10:25:34
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-08-15 11:06:37
 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

/**
 * @description 加法 DEMO
 * @param {Number} a
 * @param {Number} b
 */
export const sum = (a, b) => a + b;

/**
 * @description 判断字符串是否在数组中
 * @param {Array} array
 * @param {String} value
 * @returns {Boolean}  true 存在 |  false 不存在
 */
export const isInArray = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return true;
    }
  }
  return false;
};

/**
 * @description 页面内部用于权限判断
 * @param {Object} _this Page的this
 * @param {String} path 被过滤的路由
 * @returns {Boolean} true通过 | false 不通过
 */
export const authRouterPass = (_this, path) => {
  const { history, globalModel = {} } = _this.props;
  const tempMenuArr = globalModel.baseRouterUrl || [];
  if (path) {
    // 存在过滤路由
    if (!isInArray(tempMenuArr, path)) {
      history.push('/auth/exception/403');
      return false;
    }
    return true;
  } else if (!isInArray(tempMenuArr, history.location.pathname)) {
    if (history.location.pathname === '/auth/exception/403') {
      return false;
    }
    history.push('/auth/exception/403');
    return false;
  } else {
    return false;
  }
};

/**
 * @description 判断是否是网页路径
 * @param {String} path
 */
export const isUrl = path => reg.test(path);

// _______________TODO________________________

/**
 * @description TODO
 * @param {*} str1
 * @param {*} str2
 * @returns
 */
const getRelation = (str1, str2) => {
  if (str1 === str2) {
    // eslint-disable-next-line no-console
    console.warn('Two path are equal!');
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
};

/**
 * @description
 * @param {*} data
 * @param {*} parentPath
 * @returns
 */
export const formatterMenu = (data, parentPath = '/') =>
  data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path
    };
    if (item.children) {
      result.children = formatterMenu(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });

/**
 * @description
 * @param {*} defaultUrl
 * @returns
 */
export const getBashRedirect = defaultUrl => {
  const urlParams = new URL(window.location.href);
  const redirect = urlParams.searchParams.get('redirect');
  if (redirect) {
    urlParams.searchParams.delete('redirect');
    window.history.replaceState(null, 'redirect', urlParams.href);
  } else {
    return defaultUrl;
  }
  return redirect;
};

/**
 * @description
 * @param {*} routes
 * @returns
 */
const getRenderArr = routes => {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
};

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export const getRoutes = (path, routerData) => {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`
    };
  });
  return renderRoutes;
};
