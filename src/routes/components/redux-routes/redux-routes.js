import { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { updateLocation } from '../../actions';

class ReduxRoutes extends Component {
  constructor(props) {
    super(props);
    props.update(props.location);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.location.pathname, prevState.pathname)) {
      nextProps.update(Object.assign({}, { params: nextProps.params }, nextProps.location));
    }
    return {
      pathname: nextProps.location.pathname,
    };
  }

  render() {
    return this.props.children;
  }
}

ReduxRoutes.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.object,
  }).isRequired,
  update: PropTypes.func.isRequired,
  children: PropTypes.any,
  params: PropTypes.object,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  update: (...props) => dispatch(updateLocation(...props)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(ReduxRoutes);
