import React from 'react';
import { useToolbar } from '@ohif/core';

export function Toolbar({ servicesManager, buttonSection = 'primary' }) {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
    buttonSection,
  });

  if (!toolbarButtons.length) {
    return null;
  }

  const visibleButtons = window.innerWidth > 640 ? toolbarButtons : toolbarButtons.slice(0, 6);

  return (
    <>
      {visibleButtons?.map(toolDef => {
        if (!toolDef) {
          return null;
        }

        const { id, Component, componentProps } = toolDef;
        const tool = (
          <Component
            key={id}
            id={id}
            onInteraction={onInteraction}
            servicesManager={servicesManager}
            {...componentProps}
          />
        );

        return <div key={id}>{tool}</div>;
      })}
    </>
  );
}
