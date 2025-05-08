// Common sync group configurations
const cameraPositionSync = (id: string) => ({
  type: 'cameraPosition',
  id,
  source: true,
  target: true,
});

const hydrateSegSync = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR'],
  },
};

const ctAXIAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'ctAXIAL',
    viewportType: 'stack',
    orientation: 'axial',
    toolGroupId: 'ctToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first', // 'first', 'last', 'middle'
    },
    syncGroups: [
      cameraPositionSync('axialSync'),
      {
        type: 'voi',
        id: 'ctWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      id: 'ctDisplaySet',
    },
  ],
};

const ctSAGITTAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'ctSAGITTAL',
    viewportType: 'stack',
    orientation: 'sagittal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [
      cameraPositionSync('sagittalSync'),
      {
        type: 'voi',
        id: 'ctWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      id: 'ctDisplaySet',
    },
  ],
};

const ctCORONAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'ctCORONAL',
    viewportType: 'stack',
    orientation: 'coronal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [
      cameraPositionSync('coronalSync'),
      {
        type: 'voi',
        id: 'ctWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      id: 'ctDisplaySet',
    },
  ],
};

const ptAXIAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'ptAXIAL',
    viewportType: 'stack',
    background: [1, 1, 1],
    orientation: 'axial',
    toolGroupId: 'ptToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first', // 'first', 'last', 'middle'
    },
    syncGroups: [
      cameraPositionSync('axialSync'),
      {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: true,
        target: false,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      options: {
        voi: {
          custom: 'getPTVOIRange',
        },
        voiInverted: true,
      },
      id: 'ptDisplaySet',
    },
  ],
};

const ptSAGITTAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'ptSAGITTAL',
    viewportType: 'stack',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [
      cameraPositionSync('sagittalSync'),
      {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: true,
        target: false,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      options: {
        voi: {
          custom: 'getPTVOIRange',
        },
        voiInverted: true,
      },
      id: 'ptDisplaySet',
    },
  ],
};

const ptCORONAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'ptCORONAL',
    viewportType: 'stack',
    orientation: 'coronal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [
      cameraPositionSync('coronalSync'),
      {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: true,
        target: false,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      options: {
        voi: {
          custom: 'getPTVOIRange',
        },
        voiInverted: true,
      },
      id: 'ptDisplaySet',
    },
  ],
};

const fusionAXIAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'fusionAXIAL',
    viewportType: 'stack',
    orientation: 'axial',
    toolGroupId: 'fusionToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first', // 'first', 'last', 'middle'
    },
    syncGroups: [
      cameraPositionSync('axialSync'),
      {
        type: 'voi',
        id: 'ctWLSync',
        source: false,
        target: true,
      },
      {
        type: 'voi',
        id: 'fusionWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: false,
        target: true,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      id: 'ctDisplaySet',
    },
    {
      id: 'ptDisplaySet',
      options: {
        colormap: {
          name: 'hsv',
          opacity: [
            { value: 0, opacity: 0 },
            { value: 0.1, opacity: 0.8 },
            { value: 1, opacity: 0.9 },
          ],
        },
        voi: {
          custom: 'getPTVOIRange',
        },
      },
    },
  ],
};

const fusionSAGITTAL = {
  viewportOptions: {
    viewportId: 'fusionSAGITTAL',
    viewportType: 'stack',
    orientation: 'sagittal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [
      cameraPositionSync('sagittalSync'),
      {
        type: 'voi',
        id: 'ctWLSync',
        source: false,
        target: true,
      },
      {
        type: 'voi',
        id: 'fusionWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: false,
        target: true,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      id: 'ctDisplaySet',
    },
    {
      id: 'ptDisplaySet',
      options: {
        colormap: {
          name: 'hsv',
          opacity: [
            { value: 0, opacity: 0 },
            { value: 0.1, opacity: 0.8 },
            { value: 1, opacity: 0.9 },
          ],
        },
        voi: {
          custom: 'getPTVOIRange',
        },
      },
    },
  ],
};

const fusionCORONAL = {
  viewportOptions: {
    viewportId: 'fusionCoronal',
    viewportType: 'stack',
    orientation: 'coronal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [
      cameraPositionSync('coronalSync'),
      {
        type: 'voi',
        id: 'ctWLSync',
        source: false,
        target: true,
      },
      {
        type: 'voi',
        id: 'fusionWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: false,
        target: true,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],
  },
  displaySets: [
    {
      id: 'ctDisplaySet',
    },
    {
      id: 'ptDisplaySet',
      options: {
        colormap: {
          name: 'hsv',
          opacity: [
            { value: 0, opacity: 0 },
            { value: 0.1, opacity: 0.8 },
            { value: 1, opacity: 0.9 },
          ],
        },
        voi: {
          custom: 'getPTVOIRange',
        },
      },
    },
  ],
};

const mipSAGITTAL: AppTypes.HangingProtocol.Viewport = {
  viewportOptions: {
    viewportId: 'mipSagittal',
    viewportType: 'stack',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'mipToolGroup',
    syncGroups: [
      {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true,
        options: {
          syncColormap: true,
        },
      },
      {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: true,
        target: false,
        options: {
          syncColormap: false,
          syncInvertState: false,
        },
      },
      hydrateSegSync,
    ],

    // Custom props can be used to set custom properties which extensions
    // can react on.
    customViewportProps: {
      // We use viewportDisplay to filter the viewports which are displayed
      // in mip and we set the scrollbar according to their rotation index
      // in the cornerstone extension.
      hideOverlays: true,
    },
  },
  displaySets: [
    {
      options: {
        blendMode: 'MIP',
        slabThickness: 'fullstack',
        voi: {
          custom: 'getPTVOIRange',
        },
        voiInverted: true,
      },
      id: 'ptDisplaySet',
    },
  ],
};

export {
  ctAXIAL,
  ctSAGITTAL,
  ctCORONAL,
  ptAXIAL,
  ptSAGITTAL,
  ptCORONAL,
  fusionAXIAL,
  fusionSAGITTAL,
  fusionCORONAL,
  mipSAGITTAL,
};
