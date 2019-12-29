import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'babel-polyfill';
import services from '/src/services';
import styles from './styles.scss';
import cx from 'classnames';
import { Button } from '/src/shared';

class Reader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.preserveLocation();
    });
  }

  preserveLocation() {
    const { isOpen, close } = this.props;
    if (isOpen) {
      window.location.hash = this.hash;
      close();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isOpen } = this.props;
    if (isOpen && !prevProps.isOpen) {
      this.ref.current.scrollTop = 0;
      this.hash = window.location.hash;
    }
  }

  render() {
    const { isOpen, content, close, color } = this.props;

    return (
      <div className={cx(styles.reader, { [styles.open]: isOpen })} >
        <div className={styles.content} ref={this.ref} >
          {content}
        </div >
        <Button
          className={cx(styles.closeBtn)}
          onClick={() => {
            close();
          }}
          style={{
            background: color,
          }}
        >
          CLOSE
        </Button >
      </div >
    );
  }
}

Reader.propTypes = {
  content: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isOpen: services.reader.selectors.isOpen(state),
  content: services.reader.selectors.content(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(services.reader.actions.close()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
