import React from 'react';

const Card = ({ card, isFlipped, isMatched, onClick, disabled, index = 0 }) => {
  const containerClass = `w-28 h-28 m-3 cursor-pointer select-none perspective-1000 ${disabled ? 'opacity-60 pointer-events-none' : ''}`;

  const innerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 320ms ease',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  };

  const faceBase = 'absolute inset-0 rounded-2xl overflow-hidden backface-hidden flex items-center justify-center';

  const frontStyle = {
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    color: 'white',
    boxShadow: '0 10px 25px rgba(2,6,23,0.08)'
  };

  const backStyle = {
    transform: 'rotateY(180deg)',
    background: 'linear-gradient(180deg, #ffffff 0%, #f7faf9 100%)',
    boxShadow: '0 8px 20px rgba(2,6,23,0.06)'
  };

  return (
    <div className={containerClass} onClick={onClick} aria-label={card.name} style={{ animationDelay: `${index * 40}ms` }}>
      <div style={innerStyle}>
        <div className={`${faceBase}`} style={frontStyle}>
          <div className="text-3xl md:text-4xl animate-fade-in">🌿</div>
        </div>
        <div className={`${faceBase}`} style={backStyle}>
          <div className={`text-3xl md:text-4xl transition-transform duration-300 ${isMatched ? 'animate-glow' : ''}`}>
            {card.emoji || '🌿'}
          </div>
        </div>
      </div>
      {/* Name intentionally hidden for a cleaner, icon-only UI */}
    </div>
  );
};

export default Card;