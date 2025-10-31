// Backend API client for EcoClean

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface SubmitReportData {
  binId: string;
  userId: string;
  userWalletId: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  imageUrl: string;
  aiAnalysis: {
    urgency: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    wasteType: string;
    description?: string;
  };
  description?: string;
}

export interface ReportResponse {
  success: boolean;
  report: {
    reportId: string;
    binId: string;
    status: string;
    isFirstReport: boolean;
    reward: {
      amount: number;
      transactionId: string;
    } | null;
    aiAnalysis: {
      urgency: string;
      confidence: number;
      wasteType: string;
    };
  };
  message: string;
}

export interface BinStatus {
  bin: {
    binId: string;
    status: string;
    currentUrgency?: string;
    location?: {
      address: string;
      coordinates: { lat: number; lng: number };
    };
    lastCleanedAt?: string;
    reportCount: number;
  };
  latestReport: {
    reportId: string;
    urgency: string;
    timestamp: string;
  } | null;
  canReport: boolean;
}

// Submit a new waste report
export async function submitWasteReport(data: SubmitReportData): Promise<ReportResponse> {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit report');
  }

  return response.json();
}

// Get bin status
export async function getBinStatus(binId: string): Promise<BinStatus> {
  const response = await fetch(`${API_BASE_URL}/bins/${binId}/status`);

  if (!response.ok) {
    throw new Error('Failed to get bin status');
  }

  return response.json();
}

// Get user's reports
export async function getUserReports(userId: string) {
  const response = await fetch(`${API_BASE_URL}/reports/user/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to get user reports');
  }

  return response.json();
}

// Get user's token balance
export async function getUserBalance(userWalletId: string) {
  const response = await fetch(`${API_BASE_URL}/rewards/balance/${userWalletId}`);

  if (!response.ok) {
    throw new Error('Failed to get balance');
  }

  return response.json();
}

// Get user's reward history
export async function getRewardHistory(userId: string) {
  const response = await fetch(`${API_BASE_URL}/rewards/history/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to get reward history');
  }

  return response.json();
}

// Health check
export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
  return response.json();
}
