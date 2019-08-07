import { PureComponent } from 'react';
import currentDevice from 'current-device';
import actions from './actions';
import types from './types';
import connect from 'react-redux/es/connect/connect';

class Device extends PureComponent {
  constructor(props) {
    super(props);
    currentDevice.onChangeOrientation(newOrientation => {
      props.storeOrientation(newOrientation);
    });
  }

  render() {
    return null;
  }
}

// todo - remove oreintation from vgs reducer

Device.propTypes = types;

const mapDispatchToProps = dispatch => ({
  storeOrientation: (...props) => dispatch(actions.storeOrientation(...props)),
});

export default connect(() => ({}), mapDispatchToProps)(Device);
