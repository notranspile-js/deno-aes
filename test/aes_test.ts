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

import { aesCreateCipher, aesCreateDecipher } from "../mod.ts";
import { assertEquals } from "./test_deps.ts";

// Note: a key size of 16 bytes will use AES-128, 24 => AES-192, 32 => AES-256
const decoder = new TextDecoder();
const encoder = new TextEncoder();
const key = encoder.encode("0123456789012345");
const iv = encoder.encode("5432109876543210");
const someBytes = encoder.encode("foobar");

Deno.test("mode CBC", () => {
  const cipher = aesCreateCipher("CBC", key, iv);
  cipher.update(someBytes);
  const encrypted = cipher.finish();

  const decipher = aesCreateDecipher("CBC", key, iv);
  decipher.update(encrypted);
  const plainBytes = decipher.finish();
  const plain = decoder.decode(plainBytes);
  assertEquals(plain, "foobar");
});

Deno.test("mode CFB", () => {
  const cipher = aesCreateCipher("CFB", key, iv);
  cipher.update(someBytes);
  const encrypted = cipher.finish();

  const decipher = aesCreateDecipher("CFB", key, iv);
  decipher.update(encrypted);
  const plainBytes = decipher.finish();
  const plain = decoder.decode(plainBytes);
  assertEquals(plain, "foobar");
});
