import React, { PureComponent } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnapScroll, EventFooter } from '/src/shared';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
    };
    autoBind(this);
  }

  reverseAnimation() {
    const { reverseAnimation } = this.state;
    this.setState({ reverseAnimation: !reverseAnimation });
  }

  render() {
    const { frame, footer, themeColor, name, description, art, showOnFrame } = this.props;
    const forward = frame === showOnFrame;
    return (
      <Spring
        from={{ opacity: forward ? 0 : 1 }}
        to={{ opacity: forward ? 1 : 0 }}
        immediate={frame !== 0}
      >
        {props => <div
          className={styles.cover}
          style={{
            opacity: props.opacity,
          }}
        >
          <h1 className={styles.header} >
            <div style={{ color: themeColor }} >{name}</div >
            <div dangerouslySetInnerHTML={{ __html: description.replace(/\n\r?/g, '<br />') }} />
          </h1 >
          <img src={art} className={styles.art} />
          {footer ? <EventFooter footer={footer} themeColor={themeColor} /> : null}
        </div >}
      </Spring >
    );
  }
}

Cover.propTypes = {
  frame: PropTypes.number.isRequired,
  art: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
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
