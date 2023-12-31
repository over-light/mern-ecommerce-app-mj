export const setItem = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
    const data: string | null = localStorage.getItem(key);
  
    if (data !== null) {
      try {
        return JSON.parse(data) as T;
      } catch (error) {
        return null;
      }
    }
  
    return null;
  };

export const  removeItem = (key: string): void => {
    localStorage.removeItem(key);
};