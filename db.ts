
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const response = await fetch(`/api/data/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    if (!response.ok) throw new Error('Failed to save data');
  } catch (e) {
    console.error('Failed to set item in DB:', e);
  }
};

export const getItem = async (key: string): Promise<any> => {
  try {
    const response = await fetch(`/api/data/${key}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.error('Failed to get item from DB:', e);
    return null;
  }
};
