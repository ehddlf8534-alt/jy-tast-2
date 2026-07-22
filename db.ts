
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage setItem error:', e);
  }
  try {
    const response = await fetch(`/api/data/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    if (!response.ok) throw new Error('Failed to save data to server');
  } catch (e) {
    console.error('Failed to set item in server DB:', e);
  }
};

export const getItem = async (key: string): Promise<any> => {
  try {
    const response = await fetch(`/api/data/${key}`);
    if (response.ok) {
      const data = await response.json();
      if (data !== null && data !== undefined) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {}
        return data;
      }
    }
  } catch (e) {
    console.error('Failed to get item from server DB, falling back to localStorage:', e);
  }

  // Fallback to localStorage if API call fails or returns null
  try {
    const local = localStorage.getItem(key);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Failed to parse item from localStorage:', e);
  }

  return null;
};
