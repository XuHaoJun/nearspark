AWS Lambda function for generating image thumbnails  

## Description

클라이언트에서 CORS가 되는 이미지를 가져올 때 사용됩니다.  

hubs의 아래 함수를 사용합니다.  
`src/utils/media-url-utils.js` line 25~:  

```js
// thanks to https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8, then we convert the percent-encodings
  // into raw bytes which can be fed into btoa.
  const CHAR_RE = /%([0-9A-F]{2})/g;
  return btoa(encodeURIComponent(str).replace(CHAR_RE, (_, p1) => String.fromCharCode("0x" + p1)));
}

const farsparkEncodeUrl = url => {
  // farspark doesn't know how to read '=' base64 padding characters
  // translate base64 + to - and / to _ for URL safety
  return b64EncodeUnicode(url)
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

// ...

const thumbnailUrl = `https://${configs.THUMBNAIL_SERVER}/thumbnail/${farsparkEncodeUrl(
  url
)}${extension}?w=${width}&h=${height}`;
```

## Usage

lambda에 `index.js` 를 올려서 사용하거나, `node app.js` 를 이용하여 서버로 실행이 가능합니다.  

## Example

```sh
curl http://localhost:5000/aHR0cHM6Ly9pLnN0YWNrLmltZ3VyLmNvbS9nRU00dC5wbmc.png?w=1&h=1
```
