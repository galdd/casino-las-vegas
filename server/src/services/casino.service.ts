import { random, range } from 'lodash-es';

interface RollResult {
  roll: string[];
  isWinningRoll: boolean;
  remainingCredits: number;
}

export const runRound = (remainingCredits: number): RollResult => {
  if (remainingCredits === 0) {
    throw new Error('No credits left');
  }

  remainingCredits -= 1;

  let result = performRoll();

  if (!result.isWinningRoll) {
    return { roll: result.resultingSymbols, isWinningRoll: false, remainingCredits };
  }

  if (remainingCredits >= 40 && remainingCredits <= 60 && Math.random() < 0.3) {
    result = performRoll();
  } else if (remainingCredits > 60 && Math.random() < 0.6) {
    result = performRoll();
  }

  const reward = calculateReward(result.resultingSymbols[0]);
  remainingCredits += reward;

  return { roll: result.resultingSymbols, isWinningRoll: true, remainingCredits };
};

export const cashOut = (
  remainingCredits: number
): {
  remainingCredits: number;
  cashedOutCredits: number;
} => {
  // TODO: Implement actual cash out logic here cashedOutCredit 💰💰💰
  return {
    remainingCredits: 0,
    cashedOutCredits: remainingCredits,
  };
};

const performRoll = (): { isWinningRoll: boolean; resultingSymbols: string[] } => {
  const possibleSymbols = ['C', 'L', 'O', 'W'];
  const resultingSymbols = range(3).map(() => {
    const drawnSymbolIndex = random(possibleSymbols.length - 1);
    return possibleSymbols[drawnSymbolIndex];
  });

  const isWinningRoll = resultingSymbols.every(symbol => symbol === resultingSymbols[0]);

  return { isWinningRoll, resultingSymbols };
};

const calculateReward = (symbol: string): number => {
  switch (symbol) {
    case 'C':
      return 10;
    case 'L':
      return 20;
    case 'O':
      return 30;
    case 'W':
      return 40;
    default:
      return 0;
  }
};
