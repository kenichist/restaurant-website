'use client';

interface PlateAnimationProps {
  isVisible: boolean;
}

export const PlateAnimation = ({ isVisible }: PlateAnimationProps) => {
  return (
    <div className="relative w-64 h-64">
      {/* Plate */}
      <div
        className={`absolute w-48 h-48 bg-white rounded-full shadow-lg border-2 border-amber-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-800 ease-out delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        {/* Inner circle decoration */}
        <div
          className={`absolute w-36 h-36 border-2 border-amber-200 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-600 ease-out delay-600 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        />
      </div>

      {/* Fork - coming from left */}
      <div
        className={`absolute w-10 h-40 top-1/2 left-0 transform -translate-y-1/2 transition-all duration-800 ease-out delay-1000 ${
          isVisible ? 'opacity-100 translate-x-[30px] rotate-0' : 'opacity-0 -translate-x-[100px] -rotate-45'
        }`}
      >
        <div className="w-10 h-24 bg-gradient-to-b from-amber-300 to-amber-400 rounded-b-lg" />
        <div className="w-10 h-16 flex justify-around items-start">
          <div className="w-1 h-16 bg-amber-400 rounded-t-lg" />
          <div className="w-1 h-16 bg-amber-400 rounded-t-lg" />
          <div className="w-1 h-16 bg-amber-400 rounded-t-lg" />
          <div className="w-1 h-16 bg-amber-400 rounded-t-lg" />
        </div>
      </div>

      {/* Spoon - coming from right */}
      <div
        className={`absolute w-10 h-40 top-1/2 right-0 transform -translate-y-1/2 transition-all duration-800 ease-out delay-1000 ${
          isVisible ? 'opacity-100 -translate-x-[30px] rotate-0' : 'opacity-0 translate-x-[100px] rotate-45'
        }`}
      >
        <div className="w-10 h-24 bg-gradient-to-b from-amber-300 to-amber-400 rounded-b-lg" />
        <div className="w-10 h-16 bg-amber-400 rounded-t-full" />
      </div>
    </div>
  );
};
