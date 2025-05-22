import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChallengeProvider } from './context/ChallengeContext';
import Layout from './components/Layout/Layout';
import { clearStorage } from './utils/storage';

function App() {
  useEffect(() => {
    clearStorage();
  }, []);

  return (
    <ThemeProvider>
      <ChallengeProvider>
        <Layout />
      </ChallengeProvider>
    </ThemeProvider>
  );
}

export default App;