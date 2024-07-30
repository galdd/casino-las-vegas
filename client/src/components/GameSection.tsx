import React from 'react';
import { Button } from 'antd';
import SlotMachine from './SlotMachine';
import MessageDisplay from './MessageDisplay';
import './GameSection.css';

interface GameSectionProps {
  remainingCredits: number;
  isSpinning: boolean;
  isWinningRoll: boolean | null;
  messageText: string;
  result: string[];
  handleNewGame: () => void;
  handleRoll: () => void;
  handleCashOut: () => void;
  isSessionInitialized: boolean;
}

const GameSection = ({
  remainingCredits,
  isSpinning,
  isWinningRoll,
  messageText,
  result,
  handleNewGame,
  handleRoll,
  handleCashOut,
  isSessionInitialized,
}: GameSectionProps) => {
  return (
    <div className="game-section">
      <div id="credits-display" className="credits">Credits: {remainingCredits}</div>
      <MessageDisplay messageText={messageText} isWinningRoll={isWinningRoll} />
      <div className="buttons">
        {isSessionInitialized ? (
          <>
            <Button className="btn btn-primary" onClick={handleRoll} disabled={isSpinning || remainingCredits <= 0}>
              Roll
            </Button>
            <Button className="btn btn-default" onClick={handleCashOut} disabled={isSpinning || remainingCredits === 0}>
              Cash Out
            </Button>
          </>
        ) : (
          <Button id="new-game-button" className="btn btn-primary" onClick={handleNewGame} disabled={isSpinning}>
            New Game
          </Button>
        )}
      </div>
      <SlotMachine result={result} isSpinning={isSpinning} />
    </div>
  );
};

export default GameSection;
