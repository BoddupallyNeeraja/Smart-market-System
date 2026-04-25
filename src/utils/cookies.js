export const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name) => {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const found = cookies.find((row) => row.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.split('=')[1]) : null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
};
