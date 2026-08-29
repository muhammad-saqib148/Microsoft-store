import React from 'react';

interface MicrosoftLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textSize?: string;
  textColor?: string;
}

export const MicrosoftLogo: React.FC<MicrosoftLogoProps> = ({
  className = '',
  size = 20,
  showText = true,
  textSize = 'text-lg',
  textColor = 'text-neutral-900'
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect x="0" y="0" width="10" height="10" fill="#F25022" />
        <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
        <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
        <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
      </svg>
      {showText && (
        <div className="flex items-center tracking-tight">
          <span className={`font-semibold ${textSize} ${textColor}`}>Microsoft</span>
          <span className={`font-light ml-1.5 ${textSize} text-neutral-500`}>Store</span>
        </div>
      )}
    </div>
  );
};
