var CryptoJS = require("crypto-js");
var url = require("url");

(function () {

  function makeCanonicalString (context) {
    // implements https://github.com/mgomes/api_auth
    var request = context.getCurrentRequest();
    var canonicalString = [];
    canonicalString.push(request.getHeaderByName("Content-Type"));
    canonicalString.push(request.getHeaderByName("Content-MD5"));
    canonicalString.push(url.parse(request.url).path);
    canonicalString.push(request.getHeaderByName("Date"));
    return canonicalString.join(",");
  }

  var APIAuthDynamicValue;

  APIAuthDynamicValue = function () {
    this.evaluate = function (context) {
      let canonicalString = makeCanonicalString(context);
      let sig = CryptoJS.HmacSHA1(canonicalString, this.secretKey);
      let encodedSig = CryptoJS.enc.Base64.stringify(sig)
      return "APIAuth " + this.username + ":" + encodedSig;
    }
    this.title = function () {
      return "APIAuth";
    };
    this.text = function () {
      return this.username + ":" + this.secretKey;
    };
  }

  APIAuthDynamicValue.title = "APIAuth";
  APIAuthDynamicValue.inputs = [
    InputField("username", "Username", "String"),
    InputField("secretKey", "Secret Key", "SecureValue", {}),
  ];
  APIAuthDynamicValue.identifier = "net.ryanmccuaig.APIAuthDynamicValue";

  registerDynamicValueClass(APIAuthDynamicValue);

}).call(this)
