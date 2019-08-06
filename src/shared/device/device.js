import { PureComponent } from 'react';
import currentDevice from 'current-device';
import { storeOrientation } from './actions';
import types from './types';
import connect from 'react-redux/es/connect/connect';

class Device extends PureComponent {
  constructor(props) {
    super(props);
    currentDevice.onChangeOrientation(newOrientation => {
      props.storeOrientation(newOrientation);
    });
  }

  // componentDidMount() {
  //   window.addEventListener('orientationchange', this.onOrientationchange, false);
  //   this.onOrientationchange();
  // }
  //
  // onOrientationchange() {
  //   const { storeOrientation } = this.props;
  //   const angle = window.screen.orientation ? window.screen.orientation.angle : window.orientation;
  //   storeOrientation(angle === 0 ? 'portrait' : 'landscape');
  // }

  render() {
    return null;
  }
}

// todo - remove oreintation from vgs reducer

Device.propTypes = types;

const mapDispatchToProps = dispatch => ({
  storeOrientation: (...props) => dispatch(storeOrientation(...props)),
});

export default connect(() => ({}), mapDispatchToProps)(Device);
