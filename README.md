AES encryption implementation for Deno
======================================

JavaScript implementation of AES from the [Forge](https://github.com/digitalbazaar/forge) project and a TypeScrypt wrapper for it.

Usage example
-------------

```
import { aesCreateCipher, aesCreateDecipher } from "https://deno.land/x/notranspile_aes@1.0.0/mod.ts";

// Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
const decoder = new TextDecoder();
const encoder = new TextEncoder();
const key = encoder.encode("0123456789012345");
const iv = encoder.encode("5432109876543210");
const someBytes = encoder.encode("foobar");

// CFB mode is not supported in WebCrypto
const cipher = aesCreateCipher("CFB", key, iv);
cipher.update(someBytes);
const encrypted = cipher.finish();

const decipher = aesCreateDecipher("CFB", key, iv);
decipher.update(encrypted);
const plainBytes = decipher.finish();
const plain = decoder.decode(plainBytes);
console.log(plain);
> foobar

```

License information
-------------------

This project is released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Adapted code from the Forge project is released under [BSD License](https://github.com/digitalbazaar/forge/blob/main/LICENSE).
