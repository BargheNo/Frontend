const loadUserState = () => {
  try {
    if (typeof window === 'undefined') return undefined; // Prevent SSR access to localStorage

    const serializedState = localStorage.getItem('user');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

export const preloadedState = {
  user: loadUserState(), // Load the persisted auth state
};
