import React from 'react';

interface AdSpaceProps {
  position: 'top' | 'sidebar' | 'inline' | 'bottom';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ position, className = '' }) => {
  const sizeClasses = {
    top: 'w-full min-h-[90px]',
    sidebar: 'w-full min-h-[250px]',
    inline: 'w-full min-h-[90px]',
    bottom: 'w-full min-h-[90px]',
  };

  return (
    <div className={`bg-slate-200 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center my-4 overflow-hidden ${sizeClasses[position]} ${className}`}>
      <div id="container-e97535e4f99673e2942715a6a392cd66" className="w-full flex justify-center"></div>
      <script async="async" data-cfasync="false" src="https://pl28634462.effectivegatecpm.com/e97535e4f99673e2942715a6a392cd66/invoke.js"></script>
    </div>
  );
};

export default AdSpace;
