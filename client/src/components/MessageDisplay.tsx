import React from 'react';
import './MessageDisplay.css';

interface MessageDisplayProps {
  messageText: string;
  isWinningRoll: boolean | null;
}

const MessageDisplay = ({ messageText, isWinningRoll }: MessageDisplayProps) => {
  const getClassName = () => {
    if (isWinningRoll === null) {
      return 'underline-black';
    }
    return isWinningRoll ? 'underline-green' : 'underline-red';
  };

  return <div className={`message ${getClassName()}`}>{messageText}</div>;
};

export default MessageDisplay;
