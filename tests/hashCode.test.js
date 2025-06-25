'use strict';
const assert = require('assert');
const hashCode = require('../hashCode');

const input = 'sample input';
const first = hashCode(input);
const second = hashCode(input);

assert.strictEqual(first, second, 'hashCode should be deterministic');
assert.strictEqual(typeof first, 'number', 'hashCode result should be a number');
assert.ok(first <= 2147483647 && first >= -2147483648, 'hashCode result should be a 32-bit signed integer');

console.log('hashCode tests passed');
