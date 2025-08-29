export interface StaticQuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string;
  timeline: string | null;
  budget: string | null;
  description: string | null;
  files: string[] | null;
  status: string;
  created_at: string;
}

export interface InsertQuoteRequest {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service_type: string;
  timeline?: string | null;
  budget?: string | null;
  description?: string | null;
  files?: string[] | null;
}

const STORAGE_KEY = 'signflow_quote_requests';

// Get all quote requests from localStorage
export const getStoredQuoteRequests = (): StaticQuoteRequest[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading quote requests from localStorage:', error);
    return [];
  }
};

// Save quote requests to localStorage
const saveQuoteRequests = (requests: StaticQuoteRequest[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error('Error saving quote requests to localStorage:', error);
  }
};

// Create a new quote request
export const createStaticQuoteRequest = async (data: InsertQuoteRequest): Promise<StaticQuoteRequest> => {
  const requests = getStoredQuoteRequests();
  
  const newRequest: StaticQuoteRequest = {
    ...data,
    id: `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  
  requests.unshift(newRequest);
  saveQuoteRequests(requests);
  
  return newRequest;
};

// Get all quote requests
export const getAllStaticQuoteRequests = async (): Promise<StaticQuoteRequest[]> => {
  return getStoredQuoteRequests();
};

// Get a specific quote request by ID
export const getStaticQuoteRequest = async (id: string): Promise<StaticQuoteRequest | undefined> => {
  const requests = getStoredQuoteRequests();
  return requests.find(req => req.id === id);
};

// Update quote request status
export const updateStaticQuoteRequestStatus = async (id: string, status: string): Promise<StaticQuoteRequest | undefined> => {
  const requests = getStoredQuoteRequests();
  const requestIndex = requests.findIndex(req => req.id === id);
  
  if (requestIndex === -1) return undefined;
  
  requests[requestIndex].status = status;
  saveQuoteRequests(requests);
  
  return requests[requestIndex];
};

// Delete a quote request
export const deleteStaticQuoteRequest = async (id: string): Promise<boolean> => {
  const requests = getStoredQuoteRequests();
  const filteredRequests = requests.filter(req => req.id !== id);
  
  if (filteredRequests.length === requests.length) return false;
  
  saveQuoteRequests(filteredRequests);
  return true;
};
