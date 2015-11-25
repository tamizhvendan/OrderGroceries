const idTokenKey = "userToken";

function getIdToken() {
  return localStorage.getItem('userToken');
}

function login(idToken) {
  localStorage.setItem(idTokenKey, idToken);
}

function requireAuth(nextState, replaceState) {
  if (!localStorage.getItem(idTokenKey)) {
    replaceState({returnPath:nextState.location.pathname}, '/login');
  }
}

function isLoggedIn() {
  return !!localStorage.getItem(idTokenKey);
}

export default {
  getIdToken,
  login,
  requireAuth,
  isLoggedIn
}
