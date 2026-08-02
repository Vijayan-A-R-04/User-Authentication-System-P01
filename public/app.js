const API_URL = '/api/auth';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    fetchDashboardData();
  }
});

function switchTab(tab) {
  const loginBtn = document.getElementById('tabLoginBtn');
  const regBtn = document.getElementById('tabRegisterBtn');
  const loginView = document.getElementById('loginView');
  const regView = document.getElementById('registerView');
  const alertBanner = document.getElementById('alertBanner');

  alertBanner.classList.add('hidden');

  if (tab === 'login') {
    loginBtn.classList.add('active');
    regBtn.classList.remove('active');
    loginView.classList.remove('hidden');
    regView.classList.add('hidden');
  } else {
    regBtn.classList.add('active');
    loginBtn.classList.remove('active');
    regView.classList.remove('hidden');
    loginView.classList.add('hidden');
  }
}

function showAlert(message, type = 'success') {
  const alertBanner = document.getElementById('alertBanner');
  alertBanner.textContent = message;
  alertBanner.className = `alert-banner ${type}`;
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  const submitBtn = document.getElementById('regSubmitBtn');

  if (!username || !password) {
    showAlert('Please fill in all fields', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Creating...';

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      showAlert('Account created! Please sign in.', 'success');
      document.getElementById('registerForm').reset();
      setTimeout(() => switchTab('login'), 1200);
    } else {
      showAlert(data.message || 'Registration failed', 'error');
    }
  } catch (err) {
    showAlert('Server unreachable. Make sure MongoDB & backend are running.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Create Account';
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const submitBtn = document.getElementById('loginSubmitBtn');

  if (!username || !password) {
    showAlert('Please fill in all fields', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Signing in...';

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      showAlert('Login successful!', 'success');
      document.getElementById('loginForm').reset();
      setTimeout(() => fetchDashboardData(), 800);
    } else {
      showAlert(data.message || 'Login failed', 'error');
    }
  } catch (err) {
    showAlert('Server connection error', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Sign In';
  }
}

async function fetchDashboardData() {
  const token = localStorage.getItem('token');

  if (!token) {
    showAuthViews();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      showDashboardView(data, token);
    } else {
      localStorage.removeItem('token');
      showAuthViews();
      showAlert('Session expired. Please log in again.', 'error');
    }
  } catch (err) {
    showAlert('Error fetching dashboard session data', 'error');
  }
}

function showDashboardView(data, token) {
  document.getElementById('tabHeader').classList.add('hidden');
  document.getElementById('loginView').classList.add('hidden');
  document.getElementById('registerView').classList.add('hidden');
  document.getElementById('dashboardView').classList.remove('hidden');

  document.getElementById('dashWelcome').textContent = data.message || 'Welcome to your Dashboard';
  document.getElementById('dashUserId').textContent = data.userId || 'N/A';
  document.getElementById('tokenDisplay').textContent = token;
}

function showAuthViews() {
  document.getElementById('tabHeader').classList.remove('hidden');
  document.getElementById('dashboardView').classList.add('hidden');
  switchTab('login');
}

function handleLogout() {
  localStorage.removeItem('token');
  showAuthViews();
  showAlert('You have been logged out.', 'success');
}

function copyToken() {
  const tokenText = document.getElementById('tokenDisplay').textContent;
  if (tokenText && tokenText !== 'No active token') {
    navigator.clipboard.writeText(tokenText);
    showAlert('Token copied to clipboard!', 'success');
  }
}
