// The following are the default window level presets and can be further
// configured via the customization service.
const defaultWindowLevelPresets = {
  CT: [
    { id: 'ct-soft-tissue', description: 'Tejido blando', window: '400', level: '40' },
    { id: 'ct-lung', description: 'Pulmón', window: '1500', level: '-600' },
    { id: 'ct-liver', description: 'Hígado', window: '150', level: '90' },
    { id: 'ct-bone', description: 'Hueso', window: '2500', level: '480' },
    { id: 'ct-brain', description: 'Cerebro', window: '80', level: '40' },
  ],

  PT: [
    { id: 'pt-default', description: 'Por defecto', window: '5', level: '2.5' },
    { id: 'pt-suv-3', description: 'SUV', window: '0', level: '3' },
    { id: 'pt-suv-5', description: 'SUV', window: '0', level: '5' },
    { id: 'pt-suv-7', description: 'SUV', window: '0', level: '7' },
    { id: 'pt-suv-8', description: 'SUV', window: '0', level: '8' },
    { id: 'pt-suv-10', description: 'SUV', window: '0', level: '10' },
    { id: 'pt-suv-15', description: 'SUV', window: '0', level: '15' },
  ],
};

export default defaultWindowLevelPresets;
