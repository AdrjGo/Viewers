import React from 'react';
import classNames from 'classnames';

import ProgressLoadingBar from '../ProgressLoadingBar';
import { Icons } from '../Icons';
import { clientLogos } from '../customerkey';

import { useSearchParams } from 'react-router-dom';

/**
 *  A React component that renders a loading indicator.
 * if progress is not provided, it will render an infinite loading indicator
 * if progress is provided, it will render a progress bar
 * Optionally a textBlock can be provided to display a message
 */

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
      <Icons.Medespacio className="h-7 w-auto text-white sm:h-12" />
      <div className="w-48">
        <ProgressLoadingBar progress={progress} />
      </div>
      {textBlock}
    </div>
  );
}

export default LoadingIndicatorProgress;
