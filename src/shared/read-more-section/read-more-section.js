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
    const { open, set } = this.props;
    set();
    open();
  }

  render() {
    const { html, color, className } = this.props;
    const { clamped } = this.state;
    return (
      <Fragment>
        <HTMLEllipsis
          unsafeHTML={renderToString(html)}
          maxLine='10'
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
            read more
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
  html: PropTypes.any,
  className: PropTypes.string,
  more: PropTypes.any,
};

const mapStateToProps = state => ({
  // isMobile: Device.selectors.isMobile(state),
  color: services.vgs.selectors.color(state),
  // deviceType: Device.selectors.deviceType(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () => dispatch(services.reader.actions.open()),
  set: () => dispatch(services.reader.actions.set(ownProps.more)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadMoreSection);
