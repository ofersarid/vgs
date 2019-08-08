import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollableArea, FadeIn, RatioBox } from '/src/shared';
import cx from 'classnames';
import services from '/src/services';
import styles from './styles.scss';
import layout from '../../../../shared/styles/layout.scss';

class GlobalImpact extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { text, data } = this.props;
    return (
      <FadeIn >
        <div className={cx(styles.paragraph, layout.inner)} >
          <ScrollableArea >
            <div
              dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}
            />
            <ul className={styles.pics}>
              {data.map(item => (
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
  data: PropTypes.array,
};

const mapStateToProps = state => ({
  data: services.reactor.selectors.collectionData(state, 'global impact'),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(GlobalImpact);
