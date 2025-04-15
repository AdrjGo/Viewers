import React from 'react';
import { FooterAction } from '@ohif/ui-next';

export function UntrackSeriesModal({ hide, onConfirm, message }) {
  return (
    <div className="text-foreground text-[13px]">
      <div>
        <p>{message}</p>
        <p className="mt-2">
          Esta acción no se puede deshacer y eliminará todas las mediciones existentes.
        </p>
      </div>
      <FooterAction className="mt-4">
        <FooterAction.Right>
          <FooterAction.Secondary onClick={hide}>Cancelar</FooterAction.Secondary>
          <FooterAction.Primary
            onClick={() => {
              onConfirm();
              hide();
            }}
          >
            Borrar
          </FooterAction.Primary>
        </FooterAction.Right>
      </FooterAction>
    </div>
  );
}
