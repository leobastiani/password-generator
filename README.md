# Password Generator

`CTRL+D` to create a bookmark.

Paste this code in URL:

```javascript
javascript:(async(password="")=>{let hostname=document.location.hostname;const regex=/\w+\.(com|net|br|org).*$/;hostname.match(regex)&&(hostname=hostname.match(regex)[0]);const preffixedHostname=`${password}${hostname}`;(text=>{const elem=document.createElement("textarea");document.body.append(elem),elem.value=text,elem.select(),document.execCommand("copy"),elem.remove()})(password="*1"+(await async function(message){const msgUint8=(new TextEncoder).encode(message),hashBuffer=await crypto.subtle.digest("SHA-256",msgUint8);return btoa(new Uint8Array(hashBuffer))}(preffixedHostname)).substring(0,14)),console.debug({hostname:hostname,password:password})})();
```

## Have a personal password

Change your personal password in `javascript:(async(password="my-personal-password"`...
