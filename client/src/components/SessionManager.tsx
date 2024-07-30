import React, { useState, useEffect, ReactNode } from 'react';
import { startSession, rollSlot, cashOut, checkSession } from '../services/casinoService';

interface SessionManagerProps {
  children: (props: {
    remainingCredits: number;
    isSpinning: boolean;
    isWinningRoll: boolean | null;
    messageText: string;
    result: string[];
    handleNewGame: () => void;
    handleRoll: () => void;
    handleCashOut: () => void;
    isSessionInitialized: boolean;
  }) => ReactNode;
}

const SessionManager = ({ children }: SessionManagerProps) => {
  const [remainingCredits, setRemainingCredits] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>('Please click "New Game" to start.');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isWinningRoll, setIsWinningRoll] = useState<boolean | null>(null);
  const [result, setResult] = useState<string[]>([]);
  const [isSessionInitialized, setIsSessionInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const { remainingCredits, isSessionInitialized } = await checkSession();
        setIsSessionInitialized(isSessionInitialized);
        setRemainingCredits(remainingCredits);
        if (isSessionInitialized) {
          if (remainingCredits === 0) {
            setMessageText('No more credit');
          } else {
            setMessageText('Welcome back! Continue your game.');
          }
        }
      } catch (error) {
        console.log('No active session found or failed to validate session.');
      }
    };

    initializeSession();
  }, []);

  const handleNewGame = async () => {
    if (isSessionInitialized) {
      setMessageText('Cannot start a new game after cash out.');
      return;
    }
    try {
      const { remainingCredits } = await startSession();
      setRemainingCredits(remainingCredits);
      setMessageText('');
      setResult([]);
      setIsWinningRoll(null);
      setIsSessionInitialized(true);
    } catch (error) {
      setMessageText('Failed to start a new game. Please try again.');
      setIsWinningRoll(null);
    }
  };

  const handleRoll = async () => {
    if (isSpinning || remainingCredits <= 0) return;

    try {
      setIsSpinning(true);
      const { roll, remainingCredits: newCredits, isWinningRoll } = await rollSlot();
      setRemainingCredits(newCredits);
      setResult(roll);
      setIsWinningRoll(isWinningRoll);

      const winMessage = isWinningRoll ? `You won! Your new credits: ${newCredits}` : 'No win this time.';
      setMessageText(winMessage);

      setTimeout(() => {
        setIsSpinning(false);
        if (newCredits === 0) {
          setMessageText('Game over..');
        }
      }, 1000);
    } catch (error) {
      setMessageText('Failed to roll the slot machine. Please try again.');
      setIsSpinning(false);
    }
  };

  const handleCashOut = async () => {
    try {
      console.log();
      
      const { remainingCredits, cashedOutCredits } = await cashOut();
      setMessageText(`You cashed out with ${cashedOutCredits} credits!`);
      setRemainingCredits(remainingCredits);
      setResult([]);
      setIsWinningRoll(null);
      setIsSessionInitialized(true);
    } catch (error) {
      setMessageText('Failed to cash out. Please try again.');
    }
  };

  return (
    <>
      {children({
        remainingCredits,
        isSpinning,
        isWinningRoll,
        messageText,
        result,
        handleNewGame,
        handleRoll,
        handleCashOut,
        isSessionInitialized,
      })}
    </>
  );
};

export default SessionManager;
