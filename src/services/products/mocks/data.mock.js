import maskGroup from './mask_group.png';
import violaPic from './viola.png';

const d = new Date();

d.setUTCMonth(3);
d.setDate(3);
d.setUTCFullYear(2017);

const frame = {
  coverTagLine: 'EXTERNAL SUPPORT TECHNOLOGHY FOR PERIPHERAL VASCULAR RECONSTRUCTION',
  eventTitle: 'AATS 98th Annual Meeting in San Diego',
  eventDateFrom: new Date(),
  eventDateTo: new Date(),
  eventAddress: '62 Hadarim street pardess hanna',
  eventLinkTo: 'https://www.google.com',
  screen1Title: 'CLINICAL NEED',
  screen1Body: 'Veins are the preferred conduits for peripheral bypass and arterial reconstruction procedures. However, the inherent structural limitations of vein grafts coupled with the hemodynamics of the arterial circulation, result in pathological remodeling and graft failure. When used in lower limb bypass, approximately 20% of vein grafts are occluded at 12 months(1) and 30%-50% will fail within 3-5 years(2).By providing the vein with arterial bio-mechanical properties, FRAME prevents the vein graft\'s non-uniform dilatation post implantation, mitigates the formation of disturbed flow patterns and the subsequent development of intimal hyperplasia.',
  screen1Footnote1: 'Conte MS et al. Impact of increasing comorbidity on infrainguinal reconstruction: a 20-year perspective. Ann Surg 2001 Mar; 233(3):445-452',
  screen1Footnote2: 'Conte ms et al. Results of prevent iii: a multicenter, randomized trial of edifoligide for the prevention of vein graft failure in lower extremity bypass surgery. J vasc surg 2006; 43:742-51; discussion: 751',
  screen1Footnote3: '',
  screen2Title: 'FRAME PERFORMANCE',
  screen2Image: maskGroup,
  screen2ImageSubtitle: 'FRAME',
  screen2Body: 'Results of a randomized, controlled, pre-clinical study in a sheep model, comparing FRAME supported and non-supported vein grafts showed that FRAME mitigates the pathological remodeling of the grafts:\n' +
    '- minimal graft dilatation\n' +
    '- 70% improvement in lumen uniformity\n' +
    '- Significant reduction in neointimal area',
  screen2PDF: 'http://www.treehouseanimals.org/site/DocServer/catcareguide.pdf',
  screen2Footnote1: '',
  screen2Footnote2: '',
  screen2Footnote3: '',
};

const viola = {
  coverTagLine: 'MULTI USE CLAMPLES AORTIC SEALING DEVICE',
  eventTitle: 'AATS 98th Annual Meeting in San Diego',
  eventDateFrom: new Date('April 28, 2018'),
  eventDateTo: new Date('May 1, 2018'),
  eventAddress: 'San Diego',
  eventLinkTo: 'https://www.google.com',
  screen1Title: 'CLINICAL NEED',
  screen1Body: 'Viola’s innovative sealing device is umbrella shaped, making the insertion into the aorta possible through a 0.9 mm small hole while being folded into a sheath. Once inside the aorta, the umbrella is deployed and pulled against the interior wall sealing the hole completely. The integrated punch mechanism is then used to punch a 4 mm hole for the anastomosis. Due to the sophisticated design of the umbrella, the surgeon has ample space to suture the anastomosis while the Viola still seals the punched hole. When done, the Viola can be folded up again for the extraction by simply pushing the slider on the handle and is ready for the next anastomosis.',
  screen1Footnote1: '',
  screen1Footnote2: '',
  screen1Footnote3: '',
  screen2Title: 'WHAT IS VIOLA',
  screen2Image: violaPic,
  screen2ImageSubtitle: 'VIOLA',
  screen2Body: 'Viola is a reusable internal sealing device for aortic anastomoses during coronary artery bypass grafting procedures Viola seals the anastomosis from the inside eliminating the need for clamping of the aorta. This enables the surgeon to suture the anastomosis in a blood-free environment even when operating off-pump. This is especially important, if patients are not suited for clamping of the aorta, due to arteriosclerosis or other pathologies.',
  screen2PDF: 'http://www.treehouseanimals.org/site/DocServer/catcareguide.pdf',
  screen2Footnote1: '',
  screen2Footnote2: '',
  screen2Footnote3: '',
};

const clinicalFrame = [{
  date: new Date('November 24, 2018'),
  title: 'Weltert et al., External stenting of vein grafts in off pump coronary bypass surgery and sequential grafting',
  source: 'Journal of Cardiovascular Medicine',
  link: 'https://journals.lww.com/jcardiovascularmedicine/Fulltext/2018/11001/OC26_EXTERNAL_STENTING_OF_VEIN_GRAFTS_IN_OFF_PUMP.62.aspx',
}, {
  date: new Date('October 29, 2018'),
  title: 'Ki-Bong Kim et al, Saphenous vein: advances',
  source: 'Kim, KB., Hwang, H.Y., de Souza, D.S.R. et al. Indian J Thorac Cardiovasc Surg (2018).',
  link: 'https://link.springer.com/article/10.1007%2Fs12055-018-0753-9',
}, {
  date: new Date('April 3, 2017'),
  title: 'David P. Taggart et al, A prospective study of external stenting of saphenous vein grafts to the right coronary artery: the VEST II study',
  source: 'European Journal of Cardio-Thoracic Surgery European Journal of Cardio',
  link: 'https://academic.oup.com/ejcts/article-abstract/doi/10.1093/ejcts/ezw438/3098609/A-prospective-study-of-external-stenting-of?redirectedFrom=fulltext',
}, {
  date: new Date('December 2015'),
  title: 'Carolyn M. Webb et al, OCT imaging of aorto-coronary vein graft pathology modified by external stenting: 1-year post-surgery',
  source: 'European Heart Journal – Cardiovascular Imaging 2015',
  link: 'https://academic.oup.com/ehjcimaging/article/17/11/1290/2499589',
}];

const clinicalViola = [{
  date: new Date('June 30, 2015'),
  title: 'Meirson T. et al., Flow Patterns in Externally Stented Saphenous Vein Grafts as Related to the Development of Intimal Hyperplasia',
  source: 'The Journal of Thoracic and Cardiovascular Surgery.',
  link: 'https://www.jtcvs.org/article/S0022-5223(15)01084-3/abstract',
}, {
  date: new Date('April 15, 2015'),
  title: 'Taggart D.P. et al., A Randomized Trial of External Stenting for Saphenous Vein Grafts in Coronary Artery Bypass Grafting',
  source: 'The Annals of Thoracic Surgery (2015).',
  link: 'https://www.annalsthoracicsurgery.org/article/S0003-4975(15)00206-4/abstract',
}, {
  date: new Date('March 21, 2015'),
  title: 'Meirson T. et al., Numerical analysis of Venous External Scaffolding Technology for Saphenous Vein Grafts',
  source: 'Journal of Biomechanics (2015) .',
  link: 'https://www.sciencedirect.com/science/article/abs/pii/S0021929015001803',
}, {
  date: new Date('November 29, 2014'),
  title: 'Taggart D.P., Best practices in coronary revascularization procedures: are we where we should be?',
  source: 'Current Opinion in Cardiology.',
  link: 'https://www.ncbi.nlm.nih.gov/pubmed/25162752',
}];

export default {
  frame,
  viola,
  clinicalFrame,
  clinicalViola,
};
