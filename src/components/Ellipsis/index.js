import React, { Component } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const EllipsisText = ({ text, length, tooltip }) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  if (text.length <= length || length < 0) {
    return <span>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = text.slice(0, length - tail.length);
  }

  if (tooltip) {
    return (
      <Tooltip overlayStyle={{ wordBreak: 'break-all' }} title={text}>
        <span>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    );
  }

  return (
    <span>
      {displayText}
      {tail}
    </span>
  );
};

export default class Ellipsis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      targetCount: 0
    };
  }

  componentDidMount() {
    if (this.node) {
      this.computeLine();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lines !== nextProps.lines) {
      this.computeLine();
    }
  }

  computeLine = () => {
    const { lines } = this.props;
    if (lines && !isSupportLineClamp) {
      const text = this.shadowChildren.innerText;
      const lineHeight = parseInt(
        // eslint-disable-next-line no-undef
        getComputedStyle(this.root).lineHeight,
        10
      );
      const targetHeight = lines * lineHeight;
      this.content.style.height = `${targetHeight}px`;
      const totalHeight = this.shadowChildren.offsetHeight;
      const shadowNode = this.shadow.firstChild;

      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length
        });
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.floor(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.setState({
        text,
        targetCount: count
      });
    }
  };

  bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    // eslint-disable-next-line no-param-reassign
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      // eslint-disable-next-line no-param-reassign
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th) {
        return mid;
      }
      begin = mid;
      mid = Math.floor((end - begin) / 2) + begin;
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    // eslint-disable-next-line no-param-reassign
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = n => {
    this.root = n;
  };

  handleContent = n => {
    this.content = n;
  };

  handleNode = n => {
    this.node = n;
  };

  handleShadow = n => {
    this.shadow = n;
  };

  handleShadowChildren = n => {
    this.shadowChildren = n;
  };

  render() {
    const { text, targetCount } = this.state;
    const { children, lines, length, className, tooltip } = this.props;

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp
    });

    if (!lines && !length) {
      return <span className={cls}>{children}</span>;
    }

    // length
    if (!lines) {
      return (
        <EllipsisText className={cls} length={length} text={children || ''} tooltip={tooltip} />
      );
    }

    const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`;
      return (
        <div id={id} className={cls}>
          <style>{style}</style>
          {tooltip ? (
            <Tooltip overlayStyle={{ wordBreak: 'break-all' }} title={children}>
              {children}
            </Tooltip>
          ) : (
            children
          )}
        </div>
      );
    }

    const childNode = (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div ref={this.handleRoot} className={cls}>
        <div ref={this.handleContent}>
          {tooltip ? (
            <Tooltip overlayStyle={{ wordBreak: 'break-all' }} title={text}>
              {childNode}
            </Tooltip>
          ) : (
            childNode
          )}
          <div className={styles.shadow} ref={this.handleShadowChildren}>
            {children}
          </div>
          <div className={styles.shadow} ref={this.handleShadow}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }
}
