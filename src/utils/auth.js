const tokenName = 'spotify_clone_token'

export const setToken = (token) => {
  localStorage.setItem(tokenName, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenName)
};

export const removeToken = () => {
  localStorage.removeItem(tokenName)
};

export const getUserFromToken = () => {
  const token = getToken()
  if (!token) return null

  // 1. Get the second string (middle string) from the json web token. This represents the payload containing our user object
  const payload = JSON.parse(atob(token.split('.')[1]))
  
  // 2. Check expiry is valid by checking that it's in the future (compared to a current timestamp)
  if (payload.exp < Date.now() / 1000){
    removeToken()
    return null
  }

  return payload.user
}