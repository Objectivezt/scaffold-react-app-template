import React, { Component } from 'react';
import Login from '@components/Login';
import { JSEncrypt } from 'jsencrypt';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.module.less';

const { Tab, UserName, Password, Submit } = Login;
const CaptchaCode = UserName;
const publicKeyHead = '-----BEGIN PUBLIC KEY-----';
const publicKeyFooter = '-----END PUBLIC KEY-----';

@connect(({ loginModel, loading }) => ({
  loginModel,
  logging: loading.effects['loginModel/login']
}))
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'account'
    };
  }

  onTabChange = type => {
    this.setState({ type });
  };

  getPublicKey = () => {
    this.props.dispatch({
      type: 'loginModel/getPublicKey'
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type
        }
      });
    }
  };

  changeCaptcha = () => {
    const { loginModel } = this.props;
    const { requestId } = loginModel;
    this.props.dispatch({
      type: 'loginModel/changeCaptcha',
      payloadRequestId: {
        requestId
      }
    });
  };

  renderLoginFooter = () => {
    const forgetPwd = () => {
      // TODO
    };
    const changePwd = () => {};
    const getHelp = () => {};
    const forgetAccount = () => {};
    return (
      <>
        <Row>
          <Col span={12}>
            <span
              className={`${styles.black} ${styles.left} ${styles.point}`}
              onClick={e => forgetPwd(e)}>
              <Icon type="key" className={styles.iconRight} />
              忘记密码
            </span>
          </Col>
          <Col span={12}>
            <span
              className={`${styles.black} ${styles.left} ${styles.point}`}
              onClick={e => changePwd(e)}>
              <Icon type="tool" className={styles.iconRight} />
              修改密码
            </span>
          </Col>
          <Col span={12}>
            <span
              className={`${styles.black} ${styles.left} ${styles.point}`}
              onClick={e => getHelp(e)}>
              <Icon type="user" className={styles.iconRight} />
              忘记账号
            </span>
          </Col>
          <Col span={12}>
            <span
              className={`${styles.black} ${styles.left} ${styles.point}`}
              onClick={e => forgetAccount(e)}>
              <Icon type="hdd" className={styles.iconRight} />
              自助服务
            </span>
          </Col>
        </Row>
      </>
    );
  };

  onTabChange = type => {
    this.setState({ type });
  };

  /**
   * @description 登录提交
   * @param {Null|Object} err 异常捕获
   * @param {Object} values 传入参数
   * @returns {Boolean}
   */
  handleSubmit = (err, values) => {
    const { loginModel, dispatch } = this.props;
    const { requestId, loginKey, validCode = '' } = loginModel;
    // 异常捕获
    if (err) {
      return false;
    }
    // 公钥加密构造
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKeyHead + loginKey + publicKeyFooter);
    const encryptPwd = encrypt.encrypt(values.password);
    // 构造传参
    const tempPayload = {
      // userName 处理空格
      userName: values.userName ? values.userName.replace(/\s+/g, '') : null,
      password: encryptPwd
    };
    // 多次异常登录存在产生 requestId
    if (requestId) {
      tempPayload.requestId = requestId;
    }
    // 存在验证码状态下赋值
    if (validCode) {
      tempPayload.validCode = values.captchaCode;
    }
    // 登录 action
    dispatch({
      type: 'loginModel/login',
      payloadLogin: tempPayload
    });
    return true;
  };

  render() {
    const { type } = this.state;
    const { logging, loginModel } = this.props;
    const { validCode = '' } = loginModel;
    const changeCap = (
      <img
        alt="img"
        src={validCode}
        onClick={() => this.changeCaptcha()}
        style={{
          width: '105px',
          height: '40px'
        }}
      />
    );
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab={<span>登录123123</span>}>
            <UserName name="userName" placeholder="用户名" />
            <Password name="password" placeholder="密码" />
            {validCode ? (
              <Row>
                <Col span={16}>
                  <CaptchaCode
                    name="captchaCode"
                    placeholder="验证码"
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码'
                      }
                    ]}
                  />
                </Col>
                <Col span={8}>{changeCap}</Col>
              </Row>
            ) : null}
            {this.renderLoginFooter()}
          </Tab>
          <>
            <Submit loading={logging}>登录</Submit>
          </>
        </Login>
      </div>
    );
  }
}
