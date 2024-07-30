import axios from 'axios';

const API_URL = 'http://localhost:3000/api/casino';

interface SessionData {
  remainingCredits: number;
  isSessionInitialized: boolean;
}

interface RollResult {
  roll: string[];
  isWinningRoll: boolean;
  remainingCredits: number;
}

interface CashOutResult {
  remainingCredits: number;
  cashedOutCredits: number;
}

export const startSession = async (): Promise<SessionData> => {
  const response = await axios.post<SessionData>(`${API_URL}/start`, {}, { withCredentials: true });
  return response.data;
};

export const rollSlot = async (): Promise<RollResult> => {
  const response = await axios.post<RollResult>(`${API_URL}/roll`, {}, { withCredentials: true });
  return response.data;
};

export const cashOut = async (): Promise<CashOutResult> => {
  const response = await axios.post<CashOutResult>(`${API_URL}/cashout`, {}, { withCredentials: true });
  return response.data;
};

export const checkSession = async (): Promise<SessionData> => {
  const response = await axios.post<SessionData>(`${API_URL}/check-session`, {}, { withCredentials: true });
  return response.data;
};
