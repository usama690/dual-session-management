import React from 'react';

export interface FeatureHighlightProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="text-left">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
