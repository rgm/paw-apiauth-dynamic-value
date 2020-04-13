# APIAuth dynamic value

For hitting Rails APIs secured with APIAuth. Implements the HMAC-SHA1 request signing
described in https://github.com/mgomes/api_auth

## Usage:

On your Paw request:

- Set `Date` header to timestamp now with format `%a, %d %b %Y %H:%M:%S GMT`
- Set `Content-MD5` header to `HexToBase64` with input `MD5 Request Raw Body`
- Set `Content-Type` as appropriate
- Set `Authorization` to this `APIAuth` dynamic value with the right username
  and secret key
