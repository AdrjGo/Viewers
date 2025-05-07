import React from 'react';
import classNames from 'classnames';

import ProgressLoadingBar from '../ProgressLoadingBar';
import { Icons } from '../Icons';
import DAR from '../../../../app/public/assets/Centros/501.png';
import FUTURE from '../../../../app/public/assets/Centros/504.png';
import CLA from '../../../../app/public/assets/Centros/507.png';
import SCANCENTER from '../../../../app/public/assets/Centros/511.png';
import DIAGNOS from '../../../../app/public/assets/Centros/517.png';
import LONDRES from '../../../../app/public/assets/Centros/518.png';
import SSUCBBA from '../../../../app/public/assets/Centros/519.png';
import CEMES from '../../../../app/public/assets/Centros/525.png';
import BELGA from '../../../../app/public/assets/Centros/526.png';
import ONCOSUR from '../../../../app/public/assets/Centros/528.png';
import VENTURA from '../../../../app/public/assets/Centros/535.png';

import { useSearchParams } from 'react-router-dom';

/**
 *  A React component that renders a loading indicator.
 * if progress is not provided, it will render an infinite loading indicator
 * if progress is provided, it will render a progress bar
 * Optionally a textBlock can be provided to display a message
 */
export const clientLogos: Record<string, string> = {
  501: DAR,
  504: FUTURE,
  507: CLA,
  511: SCANCENTER,
  517: DIAGNOS,
  518: LONDRES,
  519: SSUCBBA,
  525: CEMES,
  526: BELGA,
  528: ONCOSUR,
  535: VENTURA,
};

function LoadingIndicatorProgress({ className, textBlock, progress }) {
  const [params] = useSearchParams();
  const customerKey = params.get('customerKey');

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 z-50 flex flex-col items-center justify-center space-y-5 bg-white',
        className
      )}
    >
      <Icons.LogoClient
        className="h-16 w-auto sm:h-20"
        src={clientLogos[customerKey]}
      />
      <Icons.RadoViewerLogoAbout className="h-7 w-auto text-white sm:h-12" />
      <div className="w-48">
        <ProgressLoadingBar progress={progress} />
      </div>
      {textBlock}
    </div>
  );
}

export default LoadingIndicatorProgress;
