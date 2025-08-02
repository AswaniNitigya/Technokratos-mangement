function TestApp() {
  console.log('TestApp rendering');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontSize: '18px'
    }}>
      <h1 style={{ color: 'blue' }}>Test App Working!</h1>
      <p>If you can see this, React is working fine.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      <button onClick={() => alert('Button clicked!')}>
        Test Button
      </button>
    </div>
  );
}

export default TestApp;