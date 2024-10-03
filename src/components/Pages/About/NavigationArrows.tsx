import React from 'react';

const NavigationArrows = ({ onPrev, onNext }) => {
  return (
    <div className="navigation-arrows">
      <button onClick={onPrev}>&larr;</button>
      <button onClick={onNext}>&rarr;</button>
    </div>
  );
};

export default NavigationArrows;