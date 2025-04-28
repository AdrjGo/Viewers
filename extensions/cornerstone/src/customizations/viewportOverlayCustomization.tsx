export default {
  'viewportOverlay.topLeft': [
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
    // {
    //   id: 'PatientID',
    //   inheritsFrom: 'ohif.overlayItem',
    //   label: '',
    //   title: 'Patient ID',
    //   condition: ({ referenceInstance }) => {
    //     return referenceInstance && referenceInstance.PatientID;
    //   },
    //   contentF: ({ referenceInstance }) => referenceInstance.PatientID,
    // },
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
