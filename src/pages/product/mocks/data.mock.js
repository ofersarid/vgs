import donut from './donut.png';
import maskGroup from './mask_group.png';

const d = new Date();

d.setUTCMonth(3);
d.setDate(3);
d.setUTCFullYear(2017);

export default {
  themeColor: '#0272BA',
  cover: {
    art: donut,
    name: 'Frame',
    description: 'EXTERNAL SUPPORT TECHNOLOGHY FOR PERIPHERAL VASCULAR RECONSTRUCTION',
    footer: {
      title: 'AATS 98th Annual Meeting in San Diego',
      dateFrom: new Date(),
      dateTo: new Date(),
      address: '62 Hadarim street pardess hanna',
      linkTo: 'home/danny',
    },
  },
  keyFeatures: {
    img: {
      src: maskGroup,
      title: 'Example Title',
    },
    txt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
    footNotes: ['Controlling the excessive dilatation of the vein graft', 'Being completely kink resistant, FRAME protects the graft from kinking (image/scheme)'],
    pdfSrc: 'http://www.treehouseanimals.org/site/DocServer/catcareguide.pdf',
    title: 'Key Features',
  },
  about: {
    article: 'Veins are the preferred conduits for peripheral bypass and arterial reconstruction procedures. However, the inherent structural limitations of vein grafts coupled with the hemodynamics of the arterial circulation, result in pathological remodeling and graft failure. When used in lower limb bypass, approximately 20% of vein grafts are occluded at 12 months(1)  and 30%-50% will fail within 3-5 years(2) . months(1)  and 30%-50% will fail within 3-5 years(2) . Veins are the preferred conduits for peripheral bypass and arterial reconstruction procedures. However, the inherent structural limitations of vein grafts coupled with the hemodynamics of the arterial circulation, result in pathological remodeling and graft failure. When used in lower limb bypass, approximately 20% of vein grafts are occluded at 12 months(1)  and 30%-50% will fail within 3-5 years(2) . months(1)  and 30%-50% will fail within 3-5 years(2) .',
    footNotes: ['note 1', 'note 2', 'note 3'],
    title: 'Title for 1st frame',
  },
  clinical: [{
    date: d,
    header: '1 David P. Taggart et al, A prospective study of external stenting of saphenous vein grafts to the right coronary artery: the VEST II study',
    source: 'European Journal of Cardio-Thoracic Surgery European Journal of Cardio',
    id: '1',
  }, {
    date: d,
    header: '2 David P. Taggart et al, A prospective study of external stenting of saphenous vein grafts to the right coronary artery: the VEST II study',
    source: 'European Journal of Cardio-Thoracic Surgery European Journal of Cardio',
    id: '2',
  }, {
    date: d,
    header: '3 David P. Taggart et al, A prospective study of external stenting of saphenous vein grafts to the right coronary artery: the VEST II study',
    source: 'European Journal of Cardio-Thoracic Surgery European Journal of Cardio',
    id: '3',
  }, {
    date: d,
    header: '4 David P. Taggart et al, A prospective study of external stenting of saphenous vein grafts to the right coronary artery: the VEST II study',
    source: 'European Journal of Cardio-Thoracic Surgery European Journal of Cardio',
    id: '4',
  }],
};
