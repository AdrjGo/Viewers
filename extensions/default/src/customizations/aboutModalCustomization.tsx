import React from 'react';
import { AboutModal, Icons } from '@ohif/ui-next';
import detect from 'browser-detect';

function AboutModalDefault() {
  const { os, version, name } = detect();
  const browser = `${name[0].toUpperCase()}${name.substr(1)} ${version}`;
  const versionNumber = '1.9';
  const [main] = versionNumber.split('-');
  return (
    <>
      <AboutModal className="w-[400px] max-sm:w-auto">
        <AboutModal.ProductName>
          <Icons.Medespacio />
        </AboutModal.ProductName>
        {/* <AboutModal.ProductVersion>{main}</AboutModal.ProductVersion> */}
        {/* {beta && <AboutModal.ProductBeta>{beta}</AboutModal.ProductBeta>} */}

        <AboutModal.Body>
          <AboutModal.DetailItem
            label="Dirección"
            value="Av America E435 entre Av. Santa Cruz, Edif Jaque, Planta Baja, Local 3, Planta Baja, BO"
          />
          <AboutModal.DetailItem
            label="Contacto"
            value="reynaldo.vargas@medespacio.com"
            mail={true}
          />
          <AboutModal.DetailItem
            label="Web"
            value="medespacio.com"
          />
        </AboutModal.Body>
        <div className="text-muted-foreground mt-6 flex w-full justify-between text-xs">
          <span>{`${browser}, ${os}`}</span>
          <span>v{main}</span>
        </div>
      </AboutModal>
    </>
  );
}

export default {
  'ohif.aboutModal': AboutModalDefault,
};
