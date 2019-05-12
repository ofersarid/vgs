import PropTypes from 'prop-types';
import { deviceTypes } from '/src/components/device/types';

const page = {
  ...deviceTypes,
  frame: PropTypes.number.isRequired,
};

export default {
  page,
};
