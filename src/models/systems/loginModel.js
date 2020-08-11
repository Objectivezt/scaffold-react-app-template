import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { login, queryPublicKey, queryCaptchaImage } from '@services/systems/loginService';

export default {
  namespace: 'loginModel',
  state: {
    status: false,
    validCode: '',
    requestId: '',
    loginKey: '',
    forgetUrl: '',
    changeUrl: '',
    helpUrl: '',
    forgetAccountUrl: ''
  },
  effects: {
    // 获取公钥
    *getPublicKey(_, { call, put }) {
      const res = yield call(queryPublicKey);
      if (res) {
        const { code, data, msg } = res;
        if (code === '0000') {
          yield put({
            type: 'savaKey',
            payloadPublicKey: {
              loginKey: data.publicKey,
              forgetUrl: data.forgetUrl,
              changeUrl: data.changeUrl,
              helpUrl: data.helpUrl,
              forgetAccountUrl: data.forgetAccountUrl
            }
          });
        } else {
          message.error(msg);
        }
      }
    },

    // 登录
    *login({ payloadLogin }, { call, put }) {
      const res = yield call(login, payloadLogin);
      if (res) {
        const { code, data, msg } = res;
        if (code === '0000') {
          yield put({
            type: 'saveLogin',
            payloadLogin: {
              status: true
            }
          });
          yield put(routerRedux.push('/auth/app'));
        } else {
          yield put({
            type: 'saveLogin',
            payloadLogin: {
              validCode: data.validCode,
              requestId: data.requestId
            }
          });
          message.error(msg);
        }
      }
    },

    // 切换验证码
    *changeCaptchaImage(_, { call, put }) {
      const res = yield call(queryCaptchaImage);
      if (res) {
        const { code, data, msg } = res;
        if (code === '0000') {
          yield put({
            type: 'saveImage',
            payloadImage: {
              validCode: data.validCode,
              requestId: data.requestId
            }
          });
        } else {
          message.error(msg);
        }
      }
    },

    // 前往登录页
    *goToLoginPage(_, { put }) {
      yield put(routerRedux.push('/user/login'));
    },

    // 退出登录
    *logout(_, { put }) {
      // TODO 调用退出
      // 调用当前 effects 中的goToLoginPage 方法
      yield put({ type: 'goToLoginPage' });
    }
  },
  reducers: {
    savaKey(state, { payloadPublicKey }) {
      return {
        ...state,
        ...payloadPublicKey
      };
    },
    saveLogin(state, { payloadLogin }) {
      return {
        ...state,
        ...payloadLogin
      };
    },
    changeCaptchaImage(state, { payloadImage }) {
      return {
        ...state,
        ...payloadImage
      };
    }
  }
};
