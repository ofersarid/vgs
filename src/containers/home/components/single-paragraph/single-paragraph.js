import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollableArea, FadeIn } from '/src/shared';
import cx from 'classnames';
import styles from './styles.scss';
import layout from '../../../../shared/styles/layout.scss';

class SingleParagraph extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { text } = this.props;
    return (
      <FadeIn >
        <div className={cx(styles.paragraph, layout.inner)} >
          <ScrollableArea >
            <div
              dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}
            />
          </ScrollableArea >
        </div >
      </FadeIn >
    );
  }
}

SingleParagraph.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SingleParagraph);
