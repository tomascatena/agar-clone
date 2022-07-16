import React from 'react';
import { connectWithSocketServer } from '@/socketConnection';


const App: React.FC = () => {
  React.useEffect(() => {
    console.log('App.tsx');
    connectWithSocketServer();
  }, []);

  return (
    <div>
      <h1>Agar Clone</h1>
    </div>
  );
};

export default App;
