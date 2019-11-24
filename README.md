# Password Generator

`CTRL+D` to create a bookmark.

Paste this code in URL:

```javascript
javascript:(async(password="",account="")=>{let hostname=document.location.hostname;const regex=/\w+\.(com|net|br|org).*$/;hostname.match(regex)&&(hostname=hostname.match(regex)[0]);const form=Array.from(document.querySelectorAll("form")).filter(f=>f.querySelector("input[type=password]"))[0],emailEl=form?form.querySelector("input[type=email]"):null;emailEl&&""!=emailEl.value&&(account=emailEl.value);const message=`${account=window.prompt("E-mail or account:",account)}:${password}:${hostname=window.prompt("Hostname:",hostname)}`,generatedPassword=await async function(message){const array=new Uint8Array(await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(message))),chars="!#$%&*+-=?@^_abcdefghijklmnopqrstuvwxyz0123456789"+"abcdefghijklmnopqrstuvwxyz".toUpperCase();return Array.from(array.slice(0,16)).map(n=>chars[n%chars.length]).join("")}(message);navigator.clipboard.writeText(generatedPassword),console.debug({message:message,password:generatedPassword})})();
```

Press `CTRL+V` to paste your password.

## Have a personal password

Change your personal password in `javascript:(async(password="my-personal-password"`...

## Set your default account

Change your default account in `javascript:(async(password="",account="my-default-account"`...
