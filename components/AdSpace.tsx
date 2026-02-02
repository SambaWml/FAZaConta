import React from 'react';

interface AdSpaceProps {
  position: 'top' | 'sidebar' | 'inline' | 'bottom';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ position, className = '' }) => {
  const sizeClasses = {
    top: 'w-full h-24', // Leaderboard
    sidebar: 'w-full h-64', // Rectangle
    inline: 'w-full h-32', // Banner
    bottom: 'w-full h-24',
  };

  return (
    <div className={`bg-slate-200 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center my-4 ${sizeClasses[position]} ${className}`}>
      <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Espaço para Anúncios ({position})</span>
    </div>
  );
};

export default AdSpace;
