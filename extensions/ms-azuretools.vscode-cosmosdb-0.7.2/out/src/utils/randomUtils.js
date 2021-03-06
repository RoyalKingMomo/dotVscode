"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
var randomUtils;
(function (randomUtils) {
    function getRandomHexString(length) {
        const buffer = crypto.randomBytes(Math.ceil(length / 2));
        return buffer.toString('hex').slice(0, length);
    }
    randomUtils.getRandomHexString = getRandomHexString;
})(randomUtils = exports.randomUtils || (exports.randomUtils = {}));
//# sourceMappingURL=randomUtils.js.map