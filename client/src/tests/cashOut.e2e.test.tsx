import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import App from '../App';
import { startSession, cashOut, checkSession } from '../services/casinoService';

vi.mock('../services/casinoService');

const mockedStartSession = startSession as Mock;
const mockedCashOut = cashOut as Mock;
const mockedCheckSession = checkSession as Mock;

describe('App Component - Cash Out', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cash out and returns 0 credits', async () => {
    mockedCheckSession.mockResolvedValue({ remainingCredits: 10, isSessionInitialized: true });
    mockedStartSession.mockResolvedValue({ remainingCredits: 10 });
    mockedCashOut.mockResolvedValue({ remainingCredits: 0, cashedOutCredits: 10 });

    render(<App />);

    const newGameButton = screen.getByRole('button', { name: /new game/i });
    fireEvent.click(newGameButton);

    await waitFor(() => {
      expect(screen.getByText(/credits: 10/i)).toBeInTheDocument();
    });

    const cashOutButton = screen.getByRole('button', { name: /cash out/i });
    fireEvent.click(cashOutButton);

    await waitFor(() => {
      expect(screen.getByText(/you cashed out with 10 credits!/i)).toBeInTheDocument();
      expect(screen.getByText(/credits: 0/i)).toBeInTheDocument();
    });
  });
});
