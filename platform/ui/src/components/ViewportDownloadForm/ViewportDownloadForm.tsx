import React, { useCallback, useEffect, useState, createRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '../Typography';
import Input from '../Input';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import Icon from '../Icon';
import Select from '../Select';
import InputLabelWrapper from '../InputLabelWrapper';
import Button, { ButtonEnums } from '../Button';

const FILE_TYPE_OPTIONS = [
  {
    value: 'jpg',
    label: 'jpg',
  },
  {
    value: 'png',
    label: 'png',
  },
];

const DEFAULT_FILENAME = 'Imagen';

const REFRESH_VIEWPORT_TIMEOUT = 100;

const MIN_SIZE = 100;

const ViewportDownloadForm = ({
  activeViewportElement,
  onClose,
  updateViewportPreview,
  enableViewport,
  disableViewport,
  toggleAnnotations,
  loadImage,
  downloadBlob,
  defaultSize,
  minimumSize = MIN_SIZE,
  maximumSize,
  canvasClass,
}) => {
  const { t } = useTranslation('Modals');

  const [filename, setFilename] = useState(DEFAULT_FILENAME);
  const [fileType, setFileType] = useState(['jpg']);

  const [dimensions, setDimensions] = useState({
    width: defaultSize,
    height: defaultSize,
  });

  const [showAnnotations, setShowAnnotations] = useState(true);

  const [keepAspect, setKeepAspect] = useState(true);
  const [aspectMultiplier, setAspectMultiplier] = useState({
    width: 1,
    height: 1,
  });

  const [viewportElement, setViewportElement] = useState();
  const [viewportElementDimensions, setViewportElementDimensions] = useState({
    width: defaultSize,
    height: defaultSize,
  });

  const [downloadCanvas, setDownloadCanvas] = useState({
    ref: createRef(),
    width: defaultSize,
    height: defaultSize,
  });

  const [viewportPreview, setViewportPreview] = useState({
    src: null,
    width: defaultSize,
    height: defaultSize,
  });

  const [error, setError] = useState({
    width: false,
    height: false,
    filename: false,
  });

  const hasError = Object.values(error).includes(true);

  const refreshViewport = useRef(null);

  const onKeepAspectToggle = () => {
    const { width, height } = dimensions;
    if (!keepAspect) {
      const aspectMultiplier = {
        width: width / height,
        height: height / width,
      };
      setAspectMultiplier(aspectMultiplier);
    }

    setKeepAspect(!keepAspect);
  };

  const downloadImage = () => {
    downloadBlob(
      filename || DEFAULT_FILENAME,
      fileType,
      viewportElement,
      downloadCanvas.ref.current
    );
  };

  /**
   * @param {object} value - Input value
   * @param {string} dimension - "height" | "width"
   */
  const onDimensionsChange = (value, dimension) => {
    const oppositeDimension = dimension === 'height' ? 'width' : 'height';
    const sanitizedTargetValue = value.replace(/\D/, '');
    const isEmpty = sanitizedTargetValue === '';

    // Asegurar que el valor mínimo sea 100
    const numericValue = isEmpty ? '' : Math.max(parseInt(sanitizedTargetValue) || 0);
    const clampedValue = Math.max(minimumSize, numericValue);
    const finalValue = isEmpty ? '' : Math.min(clampedValue, maximumSize);

    if (finalValue === dimensions[dimension]) {
      return;
    }

    const newDimensions = { ...dimensions };
    newDimensions[dimension] = finalValue;

    if (keepAspect && newDimensions[oppositeDimension] !== '') {
      newDimensions[oppositeDimension] = Math.round(
        newDimensions[dimension] * aspectMultiplier[oppositeDimension]
      );
    }

    setDimensions(newDimensions);

    if (!isEmpty) {
      setViewportElementDimensions(newDimensions);
      setDownloadCanvas(state => ({
        ...state,
        ...newDimensions,
      }));
    }
  };

  const error_messages = {
    width: 'El ancho mínimo son 100px.',
    height: 'El alto mínimo son 100px.',
    filename: 'El nombre del archivo no puede estar vacío',
  };

  const renderErrorHandler = errorType => {
    if (!error[errorType]) {
      return null;
    }

    return (
      <Typography
        className="mt-2 pl-1 max-sm:text-xs"
        color="error"
      >
        {error_messages[errorType]}
      </Typography>
    );
  };

  const validSize = useCallback(
    value => (value >= minimumSize ? value : minimumSize),
    [minimumSize]
  );

  const loadAndUpdateViewports = useCallback(async () => {
    const { width: scaledWidth, height: scaledHeight } = await loadImage(
      activeViewportElement,
      viewportElement,
      dimensions.width,
      dimensions.height
    );

    toggleAnnotations(showAnnotations, viewportElement, activeViewportElement);

    const scaledDimensions = {
      height: validSize(scaledHeight),
      width: validSize(scaledWidth),
    };

    setViewportElementDimensions(scaledDimensions);
    setDownloadCanvas(state => ({
      ...state,
      ...scaledDimensions,
    }));

    const {
      dataUrl,
      width: viewportElementWidth,
      height: viewportElementHeight,
    } = await updateViewportPreview(viewportElement, downloadCanvas.ref.current, fileType);

    setViewportPreview(state => ({
      ...state,
      src: dataUrl,
      width: validSize(viewportElementWidth),
      height: validSize(viewportElementHeight),
    }));
  }, [
    loadImage,
    activeViewportElement,
    viewportElement,
    dimensions.width,
    dimensions.height,
    toggleAnnotations,
    showAnnotations,
    validSize,
    updateViewportPreview,
    downloadCanvas.ref,
    fileType,
  ]);

  useEffect(() => {
    enableViewport(viewportElement);

    return () => {
      disableViewport(viewportElement);
    };
  }, [disableViewport, enableViewport, viewportElement]);

  useEffect(() => {
    if (refreshViewport.current !== null) {
      clearTimeout(refreshViewport.current);
    }

    refreshViewport.current = setTimeout(() => {
      refreshViewport.current = null;
      loadAndUpdateViewports();
    }, REFRESH_VIEWPORT_TIMEOUT);
  }, [
    activeViewportElement,
    viewportElement,
    showAnnotations,
    dimensions,
    loadImage,
    toggleAnnotations,
    updateViewportPreview,
    fileType,
    downloadCanvas.ref,
    minimumSize,
    maximumSize,
    loadAndUpdateViewports,
  ]);

  useEffect(() => {
    const { width, height } = dimensions;
    const hasError = {
      width: width < minimumSize,
      height: height < minimumSize,
      filename: !filename,
    };

    setError({ ...hasError });
  }, [dimensions, filename, minimumSize]);

  return (
    <div>
      <Typography variant="h6">
        {t('Please specify the dimensions, filename, and desired type for the output image.')}
      </Typography>

      <div className="mt-6 flex flex-col">
        <div className="mb-4 w-full">
          <Input
            data-cy="file-name"
            value={filename}
            onChange={evt => setFilename(evt.target.value)}
            label={t('Nombre de Archivo')}
          />
          {renderErrorHandler('filename')}
        </div>
        <div className="flex max-sm:justify-around">
          <div className="flex w-1/3">
            <div className="flex grow flex-col">
              <div className="w-full">
                <Input
                  type="number"
                  min={minimumSize}
                  max={maximumSize}
                  label={t('Ancho de Imagen (px)')}
                  value={(dimensions.width === '' ? minimumSize : dimensions.width)}
                  onChange={evt => onDimensionsChange(evt.target.value, 'width')}
                  data-cy="image-width"
                />
                {renderErrorHandler('width')}
              </div>
              <div className="mt-4 w-full">
                <Input
                  type="number"
                  min={minimumSize}
                  max={maximumSize}
                  label={t('Alto de Imagen (px)')}
                  value={(dimensions.height === '' ? minimumSize : dimensions.height)}
                  onChange={evt => onDimensionsChange(evt.target.value, 'height')}
                  data-cy="image-height"
                  labelClassName="text-sm"
                />
                {renderErrorHandler('height')}
              </div>
            </div>

            <div className="mt-8 flex items-center">
              <Tooltip
                position="right"
                content={keepAspect ? 'Dismiss Aspect' : 'Keep Aspect'}
              >
                <IconButton
                  onClick={onKeepAspectToggle}
                  size="small"
                  rounded="full"
                >
                  <Icon name={keepAspect ? 'link' : 'unlink'} />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className="border-secondary-dark border-l sm:px-6"></div>
          <div className="w-1/3">
            <div>
              <InputLabelWrapper
                sortDirection="none"
                label={t('Formato de Imagen')}
                isSortable={false}
                onLabelClick={() => {}}
              >
                <Select
                  className="mt-2 text-white"
                  isClearable={false}
                  value={fileType}
                  data-cy="file-type"
                  onChange={value => {
                    setFileType([value.value]);
                  }}
                  hideSelectedOptions={false}
                  options={FILE_TYPE_OPTIONS}
                  placeholder="File Type"
                />
              </InputLabelWrapper>
            </div>
            <div className="mt-4 ml-2">
              <label
                htmlFor="show-annotations"
                className="flex items-center max-sm:text-sm"
              >
                <input
                  id="show-annotations"
                  data-cy="show-annotations"
                  type="checkbox"
                  className="mr-2"
                  checked={showAnnotations}
                  onChange={event => setShowAnnotations(event.target.checked)}
                />
                <Typography>{t('Mostrar Anotaciones')}</Typography>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div
          className="bg-secondary-dark border-secondary-primary sm:w-max-content rounded p-4 max-sm:w-full sm:min-w-full"
          data-cy="image-preview"
        >
          <Typography variant="h5">{t('Previsualización')}</Typography>
          <div className='max-sm:overflow-x-auto'>
            {activeViewportElement && (
              <div
                className="mx-auto my-2"
                style={{
                  height: viewportElementDimensions.height,
                  width: viewportElementDimensions.width,
                }}
                ref={ref => setViewportElement(ref)}
              ></div>
            )}
          </div>

          {!activeViewportElement && (
            <Typography className="mt-4">{t('Active viewport has no displayed image')}</Typography>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          name="cancel"
          type={ButtonEnums.type.secondary}
          onClick={onClose}
        >
          {t('Cancelar')}
        </Button>
        <Button
          className="ml-2"
          disabled={hasError}
          onClick={downloadImage}
          type={ButtonEnums.type.primary}
          name={'download'}
        >
          {t('Descargar')}
        </Button>
      </div>
    </div>
  );
};

export default ViewportDownloadForm;
