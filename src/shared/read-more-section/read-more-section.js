import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { renderToString } from 'react-dom/server';
import autoBind from 'auto-bind';
import services from '/src/services';
import styles from './styles.scss';
import Button from '../button/button';
import { connect } from 'react-redux';
// import Device from '../device';

class ReadMoreSection extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      clamped: false,
    };
  }

  onReflow(clamped) {
    if (clamped.clamped !== this.state.clamped) {
      this.setState({ clamped: clamped.clamped });
    }
  }

  onClick() {
    const { open, set, clear } = this.props;
    clear();
    set();
    open();
  }

  render() {
    const { html, color, className, maxLines, btnTxt } = this.props;
    const { clamped } = this.state;
    return (
      <Fragment>
        <HTMLEllipsis
          unsafeHTML={renderToString(html)}
          maxLine={maxLines}
          ellipsis="..."
          basedOn='letters'
          className={className}
          onReflow={this.onReflow}
        />
        {clamped ? (
          <Button
            className={styles.readMoreBtn}
            onClick={this.onClick}
            style={{
              color,
            }}
          >
            {btnTxt}
          </Button >
        ) : null}
      </Fragment>
    );
  }
}

ReadMoreSection.propTypes = {
  color: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  html: PropTypes.any,
  className: PropTypes.string,
  btnTxt: PropTypes.string.isRequired,
  more: PropTypes.any,
  maxLines: PropTypes.number.isRequired,
};

ReadMoreSection.defaultProps = {
  maxLines: 9,
  btnTxt: 'Read More',
};

const mapStateToProps = state => ({
  // isMobile: Device.selectors.isMobile(state),
  color: services.vgs.selectors.color(state),
  // deviceType: Device.selectors.deviceType(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () => dispatch(services.reader.actions.open()),
  set: () => dispatch(services.reader.actions.set(ownProps.more)),
  clear: () => dispatch(services.reader.actions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadMoreSection);
