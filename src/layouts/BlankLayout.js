import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

class BlankLayout extends React.Component {
  componentDidMount() {
    this.props.history.push({
      pathname: '/auth'
    });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center'
        }}>
        <Spin size="large" />
      </div>
    );
  }
}

BlankLayout.defaultProps = {
  history: {}
};

BlankLayout.propTypes = {
  history: PropTypes.object
};

export default BlankLayout;
