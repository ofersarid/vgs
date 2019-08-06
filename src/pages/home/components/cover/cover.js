import React, { PureComponent } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
// import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventFooter, SnapScroll } from '/src/shared';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { frame, footer, tagLine, showOnFrame } = this.props;
    const forward = frame === showOnFrame;
    return (
      <Spring
        from={{ opacity: forward ? 0 : 1 }}
        to={{ opacity: forward ? 1 : 0 }}
        immediate={frame !== showOnFrame}
      >
        {props => <div
          className={styles.cover}
          style={{
            opacity: props.opacity,
          }}
        >
          <h1 className={styles.header} >
            <div dangerouslySetInnerHTML={{ __html: tagLine.replace(/\n\r?/g, '<br />') }} />
          </h1 >
          {footer ? <EventFooter footer={footer} /> : null}
        </div >}
      </Spring >
    );
  }
}

Cover.propTypes = {
  frame: PropTypes.number.isRequired,
  tagLine: PropTypes.string.isRequired,
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
  showOnFrame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
