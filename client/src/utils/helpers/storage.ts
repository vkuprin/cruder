const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e: Error | any | unknown) {
    throw new Error(e);
    return null;
  }
};

export default getFromLocalStorage;
