import React from 'react';
import { AboutModal, Icons } from '@ohif/ui-next';

function AboutModalDefault() {
  return (
    <>
      <AboutModal className="w-[400px] max-sm:w-auto">
        <AboutModal.ProductName>
          <Icons.RadoViewerLogoAbout />
        </AboutModal.ProductName>
        {/* <AboutModal.ProductVersion>{main}</AboutModal.ProductVersion> */}
        {/* {beta && <AboutModal.ProductBeta>{beta}</AboutModal.ProductBeta>} */}

        <AboutModal.Body>
          <AboutModal.DetailItem
            label="Address"
            value="Av America E435 entre Av. Santa Cruz, Edif Jaque, Planta Baja, Local 3, Planta Baja, BO"
          />
          <AboutModal.DetailItem
            label="Contacts"
            value="reynaldo.vargas@medespacio.com"
          />
          <AboutModal.DetailItem
            label="Web"
            value="medespacio.com"
          />
        </AboutModal.Body>
      </AboutModal>
    </>
  );
}

export default {
  'ohif.aboutModal': AboutModalDefault,
};
