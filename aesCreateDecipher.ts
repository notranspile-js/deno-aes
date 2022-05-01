/*
 * Copyright 2022, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cipher from "./forge/cipher.js";
import util from "./forge/util.js";
import { bufferToBinaryString, hex } from "./deps.ts";
import type { AesDecipher } from "./types.ts";

const encoder = new TextEncoder();

export default (mode: string, key: Uint8Array, iv: Uint8Array): AesDecipher => {
  const keyStr = bufferToBinaryString(key.buffer);
  const ivStr = bufferToBinaryString(iv.buffer);
  const deciph = cipher.createDecipher(`AES-${mode}`, keyStr);
  deciph.start({ iv: ivStr });

  return {
    update: (encrypted: Uint8Array): void => {
      const str = bufferToBinaryString(encrypted.buffer);
      const buf = util.createBuffer(str);
      deciph.update(buf);
    },
    finish: (): Uint8Array => {
      deciph.finish();
      const hexStr = deciph.output.toHex();
      const hexBytes = encoder.encode(hexStr);
      return hex.decode(hexBytes);
    },
  };
};