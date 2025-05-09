import React from 'react';
import { Icons } from '../../../../platform/ui-next/src/components/Icons/Icons';
import { clientLogosSmall } from '../../../../platform/ui-next/src/components/customerkey';

const customerKey = new URLSearchParams(window.location.search).get('customerKey');

export default {
  'viewportOverlay.topLeft': [
    {
      id: 'ClientLogoOverlay',
      inheritsFrom: 'ohif.overlayItem',
      attribute: 'ClientCode',
      title: 'Logo de la Empresa',
      contentF: () => (
        <Icons.LogoClient
          className="object-cover max-sm:h-16 sm:h-[70px]"
          src={clientLogosSmall[customerKey]}
          style={{
            filter: 'drop-shadow(0 0 2px white) drop-shadow(0 0 1px white)',
          }}
        />
      ),
    },
  ],
  'viewportOverlay.topRight': [
    {
      id: 'PatientNameOverlay',
      inheritsFrom: 'ohif.overlayItem',
      attribute: 'PatientName',
      title: 'Patient Name',
      condition: ({ referenceInstance }) =>
        referenceInstance &&
        referenceInstance.PatientName &&
        referenceInstance.PatientName.Alphabetic,
      contentF: ({ referenceInstance, formatters: { formatPN } }) =>
        formatPN(referenceInstance.PatientName.Alphabetic) +
        ' ' +
        (referenceInstance.PatientSex ? '(' + referenceInstance.PatientSex + ')' : ''),
    },
    {
      id: 'StudyDate',
      inheritsFrom: 'ohif.overlayItem',
      label: '',
      title: 'Study date',
      condition: ({ referenceInstance }) => referenceInstance?.StudyDate,
      contentF: ({ referenceInstance, formatters: { formatDate } }) =>
        formatDate(referenceInstance.StudyDate),
    },
    {
      id: 'SeriesDescription',
      inheritsFrom: 'ohif.overlayItem',
      label: '',
      title: 'Series description',
      condition: ({ referenceInstance }) => {
        return referenceInstance && referenceInstance.SeriesDescription;
      },
      contentF: ({ referenceInstance }) => referenceInstance.SeriesDescription,
    },
  ],
  'viewportOverlay.bottomLeft': [
    {
      id: 'WindowLevel',
      inheritsFrom: 'ohif.overlayItem.windowLevel',
    },
    {
      id: 'ZoomLevel',
      inheritsFrom: 'ohif.overlayItem.zoomLevel',
      condition: props => {
        const activeToolName = props.toolGroupService.getActiveToolForViewport(props.viewportId);
        return activeToolName === 'Zoom';
      },
    },
  ],
  'viewportOverlay.bottomRight': [
    {
      id: 'InstanceNumber',
      inheritsFrom: 'ohif.overlayItem.instanceNumber',
    },
  ],
};
