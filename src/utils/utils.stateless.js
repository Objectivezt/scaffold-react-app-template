import React from 'react';
import Ellipsis from '@components/Ellipsis';
import { globalColProps, globalFormItemLayout } from '@common/config';
import { Divider, Icon, Modal, Select, Tooltip, message, Menu, Col, Form, Row } from 'antd';
import GlobalCard from '@/common/globalUI/Card';

const { Option } = Select;
const FormItem = Form.Item;
const { Item: MenuItem } = Menu;

/**
 * @description 表单问号提示
 * @param {String} text
 */
export function createQuestionTooltip(text) {
  return (
    <>
      &nbsp; &nbsp;
      <Tooltip placement="right" title={text}>
        <Icon type="question-circle-o" style={{ color: 'red' }} />
      </Tooltip>
    </>
  );
}

/**
 * @description 静态模态窗口
 * @param {String} title
 * @param {String} text
 */
export function createStaticModal(title, text) {
  Modal.info({
    title,
    content: text
  });
}

/**
 * @description 静态详情
 * @param {String} msg
 */
export function createStaticMessage(msg) {
  message.info(msg, 5000);
}

/**
 * @description 构造下拉列表值
 * @param {String} value
 * @param {String} name
 */
export function createOption(value, name) {
  return (
    <Option value={value} title={name} key={value}>
      {name}
    </Option>
  );
}

/**
 * @description 构造分割线
 * @param {String} text
 */
export function createDivider(text) {
  return (
    <Divider
      orientation="left"
      style={{
        fontSize: '16px',
        fontWeight: 700,
        marginBottom: '40px'
      }}>
      {text}
    </Divider>
  );
}

/**
 * @description 构造表单项目
 * @param {String} value
 * @param {String | ReactNode } element
 */
export function createFormItem(value, element) {
  return (
    <Col {...globalColProps} key={value}>
      <FormItem label={value} {...globalFormItemLayout}>
        {element}
      </FormItem>
    </Col>
  );
}

/**
 * @description 构造动态表单项目
 * @param {String} value
 * @param {String} name
 */
export function createDynamicFormItem(value, name) {
  const style = {
    height: '0px',
    position: 'absolute',
    right: '15px'
  };

  const item = () => (
    <div style={style}>
      <Ellipsis tooltip length={8}>
        {name}
      </Ellipsis>
    </div>
  );

  return (
    <Col {...globalColProps} key={value}>
      <FormItem label={item} {...globalFormItemLayout}>
        {name}
      </FormItem>
    </Col>
  );
}

/**
 * @description 构造菜单项目
 * @param {String} value
 * @param {String} id
 * @param {String} iconType
 */
export function createMenuItem(name, id, iconType) {
  return (
    <MenuItem key={id}>
      <Icon type={iconType} />
      {name}
    </MenuItem>
  );
}

/**
 * @description 构造FormItem
 * @param {Object} form
 * item @param {String|ReactNode} label
 * item @param {String} decoratorId
 * item @param {Object} decoratorOptions
 * item @param {ReactNode} components
 */
export const createFilterComponents = (form, item, n = 8) => {
  const { getFieldDecorator } = form;
  const { label, decoratorId, decoratorOptions, components } = item;
  return (
    <Col key={decoratorId} span={n}>
      <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label={label}>
        {getFieldDecorator(decoratorId, decoratorOptions)(components)}
      </FormItem>
    </Col>
  );
};

/**
 * @description 构造FormItem 响应式支持 label和wrapper 同一行
 * @param {Object} form
 * item @param {String|ReactNode} label
 * item @param {String} decoratorId
 * item @param {Object} decoratorOptions
 * item @param {ReactNode} components
 */
export const createFilterComponentsV2 = (form, item) => {
  const { getFieldDecorator } = form;
  const { label, decoratorId, decoratorOptions, components } = item;
  return (
    <Col key={decoratorId} sm={24} md={12} lg={8} xl={6} xll={6}>
      <FormItem
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        colon
        style={{ width: '100%' }}
        placeholder="请输入">
        {getFieldDecorator(decoratorId, decoratorOptions)(components)}
      </FormItem>
    </Col>
  );
};

/**
 * @description 通用查询
 * @param { String } title
 * @param { React } CardExtra
 * @param { React } FormItemComponents
 * @param { React } ButtonComponents
 */
export const createFormSearch = (title, CardExtra, FormItemComponents, ButtonComponents) => (
  <GlobalCard title={title} extra={CardExtra || null} mode={CardExtra ? null : 'search'}>
    <Form>
      <Row>
        <Col sm={24} md={16} lg={18} xl={18} xll={18}>
          <Row>{FormItemComponents}</Row>
        </Col>
        <Col sm={24} md={8} lg={6} xl={6} xll={6}>
          <Row style={{ marginTop: '40px' }}>
            <Col style={{ float: 'right' }}>{ButtonComponents}</Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </GlobalCard>
);
