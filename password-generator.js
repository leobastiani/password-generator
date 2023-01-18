(async (password = "", account = "") => {
  async function generatePassword(message, length, collection) {
    const array = new Uint16Array(
      await crypto.subtle.digest("SHA-512", new TextEncoder().encode(message))
    );

    return Array.from(array.slice(0, length))
      .map((n) => collection[n % collection.length])
      .join("");
  }

  let hostname = document.location.hostname;
  const regex = /\w+\.(com|net|org).*$/;
  if (hostname.match(regex)) {
    hostname = hostname.match(regex)[0];
  }

  const form = Array.from(document.querySelectorAll("form")).filter((f) =>
    f.querySelector("input[type=password]")
  )[0];
  const emailEl = form ? form.querySelector("input[type=email]") : null;
  if (emailEl && emailEl.value != "") {
    account = emailEl.value;
  }

  const cachedPrompt = (message, key, def) => {
    const ret = window.prompt(message, localStorage.getItem(key) || def);
    if (ret) {
      localStorage.setItem(key, ret);
      return ret;
    }
  };

  account = cachedPrompt(
    "E-mail or account:",
    "PASSWORD_GENERATOR_ACCOUNT",
    account
  );
  if (!account) return;
  hostname = cachedPrompt("Hostname:", "PASSWORD_GENERATOR_HOSTNAME", hostname);
  if (!hostname) return;
  const collection = cachedPrompt(
    "Char collection:\nlowerCase\nupperCase\nnumber\nsymbol",
    "PASSWORD_GENERATOR_COLLECTION",
    "16-lowerCase-upperCase-number-symbol"
  );
  if (!collection) return;

  const LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
  const UPPER_CASE = LOWER_CASE.toUpperCase();
  const NUMBER = "0123456789";
  const SYMBOL = "!#$%&*+-=?@^_";

  const options = {
    size: Math.min(32, parseInt(collection.match(/^\d+/)[0])),
    lowerCase: Boolean(collection.match(/\blowerCase\b/)),
    upperCase: Boolean(collection.match(/\bupperCase\b/)),
    number: Boolean(collection.match(/\bnumber\b/)),
    symbol: Boolean(collection.match(/\bsymbol\b/)),
    toString() {
      return [
        this.size,
        this.lowerCase && "lowerCase",
        this.upperCase && "upperCase",
        this.number && "number",
        this.symbol && "symbol",
      ]
        .filter(Boolean)
        .join("-");
    },
    toCollection() {
      return [
        this.lowerCase && LOWER_CASE,
        this.upperCase && UPPER_CASE,
        this.number && NUMBER,
        this.symbol && SYMBOL,
      ]
        .filter(Boolean)
        .join("");
    },
  };

  const defaultMessage = `${account}:${password}:${options.toString()}:${hostname}`;
  for (let tries = 0; ; tries++) {
    const message = defaultMessage.concat(!tries ? "" : `:${tries}`);
    const password = await generatePassword(
      message,
      options.size,
      options.toCollection()
    );
    const passwordAsArray = password.split("");
    if (
      options.lowerCase &&
      !passwordAsArray.some((ch) => LOWER_CASE.includes(ch))
    ) {
      continue;
    }
    if (
      options.upperCase &&
      !passwordAsArray.some((ch) => UPPER_CASE.includes(ch))
    ) {
      continue;
    }
    if (options.number && !passwordAsArray.some((ch) => NUMBER.includes(ch))) {
      continue;
    }
    if (options.symbol && !passwordAsArray.some((ch) => SYMBOL.includes(ch))) {
      continue;
    }
    console.debug({ message, password });

    if (location.host === "accounts.google.com") {
      document.querySelector("[name=password]").value = password;
    } else {
      navigator.clipboard.writeText(password);
    }
    break;
  }
})();
