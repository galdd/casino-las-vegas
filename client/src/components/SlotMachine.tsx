import React, { useState, useEffect, memo } from 'react';
import './SlotMachine.css';

interface SlotMachineProps {
  result: string[];
  isSpinning: boolean;
}

const SlotMachine = ({ result, isSpinning }: SlotMachineProps) => {
  const [visibleResults, setVisibleResults] = useState<string[]>(['', '', '']);

  useEffect(() => {
    if (isSpinning) {
      setVisibleResults(['X', 'X', 'X']);
      return;
    }

    result.forEach((symbol, index) => {
      setTimeout(() => {
        setVisibleResults(prev => {
          const newResults = [...prev];
          newResults[index] = symbol;
          return newResults;
        });
      }, (index + 1) * 1000);
    });
  }, [isSpinning, result]);

  return (
    <div className="slot-machine">
      {visibleResults.map((symbol, index) => (
        <div key={index} className="slot">
          {isSpinning ? 'X' : symbol}
        </div>
      ))}
    </div>
  );
};

export default memo(SlotMachine);
