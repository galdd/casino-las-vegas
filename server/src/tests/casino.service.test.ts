// src/tests/casino.service.test.ts
import { describe, it, expect } from 'vitest';
import { runRound } from '../services/casino.service.js';

describe('Casino Service', () => {
  
  it('should decrease credits by 1 on each roll', () => {
    const initialCredits = 10;
    const result = runRound(initialCredits);
    expect(result.remainingCredits).toBe(initialCredits - 1);
  });

  it('should throw an error if no credits left', () => {
    const credits = 0;
    expect(() => runRound(credits)).toThrow('No credits left');
  });

  it('should increase credits if a winning roll occurs', () => {
    const initialCredits = 10;
    const result = runRound(initialCredits);
    if (result.isWinningRoll) {
      expect(result.remainingCredits).toBeGreaterThan(initialCredits - 1);
    } else {
      expect(result.remainingCredits).toBe(initialCredits - 1);
    }
  });

});
