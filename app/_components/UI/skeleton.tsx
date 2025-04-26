import React from 'react';

interface SkeletonProps {
  count?: number; 
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ count = 1, className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            ${className}
            pt-2
            placeholder-glow
            rounded-3
          `}
        >
          <div className="placeholder col-12 h-24 rounded-1"></div>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
