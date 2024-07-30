// startNewGame.e2e.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import App from '../App';
import { startSession, checkSession } from '../services/casinoService';

// Mock the services
vi.mock('../services/casinoService');

const mockedStartSession = startSession as Mock;
const mockedCheckSession = checkSession as Mock;

describe('App Component - Start New Game', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts a new game and displays initial credits', async () => {
    mockedCheckSession.mockResolvedValue({ remainingCredits: 0, isSessionInitialized: false });
    mockedStartSession.mockResolvedValue({ remainingCredits: 10 });

    render(<App />);

    const newGameButton = screen.getByRole('button', { name: /new game/i });
    fireEvent.click(newGameButton);

    await waitFor(() => {
      expect(screen.getByText(/credits: 10/i)).toBeInTheDocument();
    });
  });
});
