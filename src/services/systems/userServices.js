import request from '@utils/request';

// 获取菜单
export function queryMenus() {
  return request('user/queryCurrentMenus');
}

// 获取按钮
export function queryButtons() {
  return request('user/queryCurrentButtons');
}

// 获取当前用户
export function queryCurrentUser() {
  return request('user/queryCurrentUser');
}
