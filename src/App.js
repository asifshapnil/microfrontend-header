import React, { useState, useEffect } from 'react'; // Must be imported for webpack to work
import './App.css';

function App() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    async function loadStore() {
      try {
        const { store, dummy } = await import('HomeApp/store');
        setStore(store);
      } catch (error) {
        console.error("Error loading the remote store:", error);
      }
    }

    loadStore();
  }, []);

  if (!store) {
    return <div>Loading store...</div>; // Or some other loading indicator
  }

  return (
    <div className="HeaderApp">
      <div>Hello {store.state.user}</div>
    </div>
  );
}

export default App;