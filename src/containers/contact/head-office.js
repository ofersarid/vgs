import React from 'react';
import cx from 'classnames';
import layout from '/src/shared/styles/layout.scss';
import { FadeIn } from '/src/shared';
import utils from '/src/utils';
import styles from './styles.scss';

const HeadOffice = () => {
  const isMobile = utils.isMobile();
  const divider = isMobile ? <br /> : <span className={styles.spacer} />;
  const divider2 = isMobile ? <br /> : <span className={styles.pipe}>|</span>;
  return (
    <FadeIn className={cx({ [layout.inner]: isMobile, [styles.inner]: isMobile, [styles.spaceBottom]: !isMobile })} >
      <p >
        <span>Vascular Graft Solutions (VGS),</span>{divider}
        <span>24 Raoul Wallenberg St. Ziv Towers,</span>{divider}
        <span>Building A, ground floor,</span>{divider}
        <span>Tel-Aviv 6971921,</span>{divider}
        <span>Israel</span>
      </p >
      <p >
        Phone: +972-3-5499054{divider2}
        Fax: +972-3-6024966{divider2}
        <a className={styles.link} href="mailto:info@graftsolutions.com" >info@graftsolutions.com</a >
      </p >
    </FadeIn >
  );
};

export default HeadOffice;
