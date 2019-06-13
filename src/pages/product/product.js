import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/components';
import { TwoColumnLayout, Clinical, Cover, IndexHeader } from './components';
import Device from '/src/components/device';
import dataMock from './data.mock';
import donut from './donut.png';

// import { firestoreConnect } from 'react-redux-firebase';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.didMount = false;
  }

  componentDidMount() {
    this.didMount = true;
  }

  render() {
    const { frame } = this.props;
    return (
      <Fragment>
        {frame > 0 && <IndexHeader index={1} header={dataMock[0].title} />}
        {dataMock.slice(1).map((d, i) => (
          <IndexHeader key={`index-${i}`} index={i + 2} header={dataMock[i + 1].title} />
        ))}
        <IndexHeader index={dataMock.length + 1} header="Clinical" />
        <SnapScroll start={5} >
          <Cover
            art={donut}
            themeColor="blue"
            name="Frame"
            description="EXTERNAL SUPPORT TECHNOLOGHY FOR PERIPHERAL VASCULAR RECONSTRUCTION"
            footer={{
              title: 'AATS 98th Annual Meeting in San Diego',
              dateFrom: new Date(),
              dateTo: new Date(),
              address: '62 Hadarim street pardess hanna',
              linkTo: 'home/danny',
            }}
          />
          {dataMock.map((d, i) => {
            return <TwoColumnLayout
              key={d.title}
              header={d.title}
              footNotes={d.footNotes}
              article={d.article}
              index={i + 1}
            />;
          })}
          <Clinical index={dataMock.length + 1} themeColor="blue" />
        </SnapScroll >
      </Fragment>
    );
  }
}

Product.propTypes = {
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
});

export default compose(
  connect(mapStateToProps, {}),
  // firestoreConnect(() => ([{
  //   collection: 'collections',
  //   doc: 'xB6QKYKm7tnXl2QNjjfF',
  //   subcollections: [{
  //     collection: 'data',
  //     // where: [['active', '==', true]],
  //     // orderBy: ['name', 'desc'],
  //   }],
  // }])),
)(Product);
