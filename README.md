# Password Generator

`CTRL+D` to create a bookmark.

Paste this code in URL:

```javascript
javascript:(async(password="",account="")=>{async function generatePassword(message,length,collection){const array=new Uint16Array(await crypto.subtle.digest("SHA-512",(new TextEncoder).encode(message)));return Array.from(array.slice(0,length)).map(n=>collection[n%collection.length]).join("")}let hostname=document.location.hostname;const regex=/\w+\.(com|net|org).*$/;hostname.match(regex)&&(hostname=hostname.match(regex)[0]);const form=Array.from(document.querySelectorAll("form")).filter(f=>f.querySelector("input[type=password]"))[0],emailEl=form?form.querySelector("input[type=email]"):null;emailEl&&""!=emailEl.value&&(account=emailEl.value);const cachedPrompt=(message,key,def)=>{const ret=window.prompt(message,localStorage.getItem(key)||def);if(ret)return localStorage.setItem(key,ret),ret};if(!(account=cachedPrompt("E-mail or account:","PASSWORD_GENERATOR_ACCOUNT",account)))return;if(!(hostname=cachedPrompt("Hostname:","PASSWORD_GENERATOR_HOSTNAME",hostname)))return;const collection=cachedPrompt("Char collection:\nlowerCase\nupperCase\nnumber\nsymbol","PASSWORD_GENERATOR_COLLECTION","16-lowerCase-upperCase-number-symbol");if(!collection)return;const LOWER_CASE="abcdefghijklmnopqrstuvwxyz",UPPER_CASE=LOWER_CASE.toUpperCase(),options={size:Math.min(32,parseInt(collection.match(/^\d+/)[0])),lowerCase:Boolean(collection.match(/\blowerCase\b/)),upperCase:Boolean(collection.match(/\bupperCase\b/)),number:Boolean(collection.match(/\bnumber\b/)),symbol:Boolean(collection.match(/\bsymbol\b/)),toString(){return[this.size,this.lowerCase&&"lowerCase",this.upperCase&&"upperCase",this.number&&"number",this.symbol&&"symbol"].filter(Boolean).join("-")},toCollection(){return[this.lowerCase&&LOWER_CASE,this.upperCase&&UPPER_CASE,this.number&&"0123456789",this.symbol&&"!#$%&*+-=?@^_"].filter(Boolean).join("")}},defaultMessage=`${account}:${password}:${options.toString()}:${hostname}`;for(let tries=0;;tries++){const message=defaultMessage.concat(tries?`:${tries}`:""),password=await generatePassword(message,options.size,options.toCollection()),passwordAsArray=password.split("");if((!options.lowerCase||passwordAsArray.some(ch=>LOWER_CASE.includes(ch)))&&((!options.upperCase||passwordAsArray.some(ch=>UPPER_CASE.includes(ch)))&&(!options.number||passwordAsArray.some(ch=>"0123456789".includes(ch)))&&(!options.symbol||passwordAsArray.some(ch=>"!#$%&*+-=?@^_".includes(ch))))){if(console.debug({message:message,password:password}),"accounts.google.com"===location.host)document.querySelector("[name=password]").value=password;else try{await navigator.clipboard.writeText(password)}catch(e){document.body.addEventListener("click",()=>navigator.clipboard.writeText(password),{once:!0})}break}}})();
```

Press `CTRL+V` to paste your password.

## Have a personal password

Change your personal password in `javascript:(async(password="my-personal-password"`...

## Set your default account

Change your default account in `javascript:(async(password="",account="my-default-account"`...

## Force Google to store your password

Use this form generator and fill it with your data:

```javascript
javascript:const form=document.createElement("form"),input1=document.createElement("input"),input2=document.createElement("input"),submit=document.createElement("input");form.append(input1),form.append(input2),form.append(submit),input2.type="password",submit.type="submit",form.method="post",document.body.append(form),input1.select();
```
