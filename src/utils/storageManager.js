const STORAGE_KEY = 'placement_analysis_history';

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save analysis to history
export function saveAnalysis(analysisData) {
    const history = getHistory();
    const entry = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...analysisData
    };

    history.unshift(entry); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return entry.id;
}

// Get all history
export function getHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
}

// Get specific analysis by ID
export function getAnalysisById(id) {
    const history = getHistory();
    return history.find(item => item.id === id);
}

// Delete analysis
export function deleteAnalysis(id) {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Update specific analysis (for skill confidence and adjusted score)
export function updateAnalysis(id, updates) {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return history[index];
    }
    return null;
}

// Clear all history
export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}
