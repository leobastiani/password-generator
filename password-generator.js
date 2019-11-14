(async (password = '') => {
  const copy = (text) => {
    const elem = document.createElement('textarea');
    document.body.append(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    elem.remove();
  }

  async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    return btoa(new Uint8Array(hashBuffer));
  }

  let hostname = document.location.hostname;
  const regex = /\w+\.(com|net|br|org).*$/;
  if(hostname.match(regex)) {
    hostname = hostname.match(regex)[0];
  }
  const preffixedHostname = `${password}${hostname}`

  password = '*1'+(await digestMessage(preffixedHostname)).substring(0, 14);

  copy(password);
  console.debug({ hostname, password })
})();
