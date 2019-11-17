(async (password = '', account='') => {
  const copy = (text) => {
    const elem = document.createElement('textarea');
    document.body.append(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    elem.remove();
  }

  const paste = async () => {
    return await navigator.clipboard.readText();
  }

  async function generatePassword(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const array = new Uint8Array(hashBuffer);

    const lowLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppLetters = lowLetters.toUpperCase();
    const numbers = '0123456789';
    const symbols = '!#$%&*+-=?@^_';
    const chars = symbols + lowLetters + numbers + uppLetters;

    return Array.from(array.slice(0, 16)).map(n => chars[n % chars.length]).join('');
  }

  let hostname = document.location.hostname;
  const regex = /\w+\.(com|net|br|org).*$/;
  if(hostname.match(regex)) {
    hostname = hostname.match(regex)[0];
  }

  const form = Array.from(document.querySelectorAll('form')).filter(f => f.querySelector('input[type=password]'))[0];
  const emailEl = form ? form.querySelector('input[type=email]') : null;
  if(emailEl && emailEl.value != '') {
    account = emailEl.value
  }

  account = window.prompt('E-mail or account:', account);
  hostname = window.prompt('Hostname:', hostname);

  const message = `${account}:${password}:${hostname}`;
  const generatedPassword = await generatePassword(message);

  copy(generatedPassword);
  console.debug({ message, password: generatedPassword })
})();
