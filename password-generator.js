(async (password = '', account='') => {
  async function generatePassword(message) {
    const array = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message)));

    const lowLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppLetters = lowLetters.toUpperCase();
    const numbers = '0123456789';
    const symbols = '!#$%&*+-=?@^_';
    const chars = symbols + lowLetters + numbers + uppLetters;

    return Array.from(array.slice(0, 16)).map(n => chars[n % chars.length]).join('');
  }

  let hostname = document.location.hostname;
  const regex = /\w+\.(com|net|org).*$/;
  if(hostname.match(regex)) {
    hostname = hostname.match(regex)[0];
  }

  const form = Array.from(document.querySelectorAll('form')).filter(f => f.querySelector('input[type=password]'))[0];
  const emailEl = form ? form.querySelector('input[type=email]') : null;
  if(emailEl && emailEl.value != '') {
    account = emailEl.value
  }

  account = window.prompt('E-mail or account:', account);
  if(!account) return;
  hostname = window.prompt('Hostname:', hostname);
  if(!hostname) return;

  const message = `${account}:${password}:${hostname}`;
  const generatedPassword = await generatePassword(message);

  navigator.clipboard.writeText(generatedPassword);
  console.debug({ message, password: generatedPassword })
})();
