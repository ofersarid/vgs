import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, IndexHeader } from '/src/shared';
import {
  TwoColumnLayout, ThreeColumnLayout, Clinical, Cover, ImgTxtBtn, Summary, TwoImagesLayout, Downloads
} from './components';
import Device from '/src/shared/device';
import services from '/src/services';
import frameSummeryPic from '/src/assets/frame_summery.png';
import violaSummeryPic from '/src/assets/viola_summery.png';

// import { firestoreConnect } from 'react-redux-firebase';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.didMount = false;
    props.setColor(this.resolveColor());
  }

  componentDidMount() {
    this.didMount = true;
  }

  resolveSummeryPic() {
    const { name } = this.props;
    switch (name) {
      case 'FRAME':
        return frameSummeryPic;
      case 'VIOLA':
        return violaSummeryPic;
      default:
        return '';
    }
  }

  resolveColor() {
    const { name } = this.props;
    switch (name) {
      case 'FRAME':
        return '#0272BA';
      case 'VIOLA':
        return '#662D91';
      default:
        return '';
    }
  }

  render() {
    const { color, data, name, art, orientation, isMobile } = this.props;
    return data ? (
      <Fragment >
        {(orientation === 'landscape' && isMobile) ? null : (
          <Fragment>
            <IndexHeader index={1} header={data.screen1Title} />
            <IndexHeader index={2} header={data.screen2Title} />
            <IndexHeader index={3} header={data.screen3Title} />
            <IndexHeader index={4} header={data.screen4Title} />
            <IndexHeader index={5} header={data.screen5Title} />
            <IndexHeader index={6} header={data.screen6Title} />
            <IndexHeader index={7} header={data.screen7Title} />
            <IndexHeader index={8} header="Clinical" />
          </Fragment>
        )}
        <SnapScroll >
          <Cover
            art={art}
            themeColor={color}
            name={name}
            description={data.coverTagLine}
            footer={{
              title: data.eventTitle,
              dateFrom: data.eventDateFrom,
              dateTo: data.eventDateTo,
              address: data.eventAddress,
              linkTo: data.eventLinkTo,
            }}
          />
          <TwoColumnLayout
            article={data.screen1Body}
            footNotes={[data.screen1Footnote1, data.screen1Footnote2, data.screen1Footnote3]}
          />
          <ImgTxtBtn
            img={data.screen2Image}
            txt={data.screen2Body}
            footNotes={[data.screen2Footnote1, data.screen2Footnote2, data.screen2Footnote3]}
            pdfSrc={data.screen2PDF}
            imgSubTitle={data.screen2ImageSubtitle}
            themeColor={color}
          />
          <ImgTxtBtn
            youtube={data.screen3Videolink}
            txt={data.screen3Body}
            footNotes={[data.screen3Footnote1, data.screen3Footnote2, data.screen3Footnote3]}
            showOnFrame={3}
            themeColor={color}
          />
          <ThreeColumnLayout
            showOnFrame={4}
            data={[data.screen4Bullet1, data.screen4Bullet2, data.screen4Bullet3, data.screen4Bullet4, data.screen4Bullet5, data.screen4Bullet6]}
          />
          <TwoImagesLayout
            showOnFrame={5}
            image1={data.screen5Image1}
            image2={data.screen5Image2}
            img1Description={data.screen5Image1Subtitle}
            img2Description={data.screen5Image2Subtitle}
          />
          <Downloads
            showOnFrame={6}
            image={data.screen6Image}
            imageTitle={data.screen6ImageSubtitle}
            brochure={data.brochure}
            ifu={data.ifu}
            patientCard={data.patientCard}
            instructions={data.instructions}
            themeColor={color}

          />
          <Summary showOnFrame={7} art={this.resolveSummeryPic()} data={[data.screen7Bullet1, data.screen7Bullet2, data.screen7Bullet3, data.screen7Bullet4]} />
          <Clinical showOnFrame={8} themeColor={color} />
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

Product.propTypes = {
  frame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  art: PropTypes.string.isRequired,
  data: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  setColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  color: services.vgs.selectors.color(state),
  data: services.reactor.selectors.pageData(state, services.products.selectors.name(state)),
  name: services.products.selectors.name(state),
  art: services.products.selectors.art(state),
  isMobile: Device.selectors.isMobile(state),
  orientation: Device.selectors.orientation(state),
});

const mapDispatch = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatch),
)(Product);
