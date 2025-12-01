// components/StepIndicator.jsx
import React from 'react';

const StepIndicator = ({ current, total }) => (
  <div className="flex items-center justify-center mb-8">
    {[...Array(total)].map((_, i) => (
      <React.Fragment key={i}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
            i + 1 <= current ? 'bg-primary text-white' : 'bg-light border-2 border-light text-muted'
          }`}
        >
          {i + 1}
        </div>
        {i < total - 1 && <div className={`flex-1 h-1 transition-all duration-300 ${i + 1 < current ? 'bg-primary' : 'bg-gray-100'}`}></div>}
      </React.Fragment>
    ))}
  </div>
);

export default StepIndicator;
