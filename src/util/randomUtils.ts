export function generateId(len: number) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, '0');
}
