import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollableArea, FadeIn, RatioBox } from '/src/shared';
import cx from 'classnames';
import styles from './styles.scss';
import layout from '../../../../shared/styles/layout.scss';

class GlobalImpact extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { text, regions } = this.props;
    return (
      <FadeIn spread >
        <div className={cx(styles.paragraph, layout.inner)} >
          <ScrollableArea >
            <div
              dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}
            />
            <ul className={styles.pics}>
              {regions.map(item => (
                <div key={item.label} className={styles.pic}>
                  <RatioBox ratio={1} image={item.pic} className={styles.picImg} />
                  <label>{item.label}</label>
                </div>
              ))}
            </ul>
          </ScrollableArea >
        </div >
      </FadeIn >
    );
  }
}

GlobalImpact.propTypes = {
  text: PropTypes.string.isRequired,
  regions: PropTypes.array,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(GlobalImpact);
