import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const saveValue = async () => {
    await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    setValue('');
  };

  const getValue = async () => {
    const res = await fetch(`${API_URL}/get`);
    const data = await res.json();
    setStoredValue(data.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb',
        fontFamily: 'sans-serif',
        width: "100vw",
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '350px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '1.5rem', color: '#111827' }}>
          Hello World AWS
        </h1>

        <input
          type="text"
          placeholder="Enter a value..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            onClick={saveValue}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={getValue}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Get
          </button>
        </div>

        <p style={{ color: '#374151' }}>
          <strong>Stored value:</strong>{' '}
          {storedValue ? storedValue : 'No value yet'}
        </p>
      </div>
    </div>
  );
}

export default App;