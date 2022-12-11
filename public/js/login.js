const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login');
    const password = document.querySelector('#password-login');

    if(username && password) {
      const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to login');
    };
  }};
  
    
  
  document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);