"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const extensionVariables_1 = require("../extensionVariables");
class Reporter extends vscode.Disposable {
    constructor(ctx) {
        super(() => extensionVariables_1.ext.reporter.dispose());
        let packageInfo = getPackageInfo(ctx);
        extensionVariables_1.ext.reporter = packageInfo && new vscode_extension_telemetry_1.default(packageInfo.name, packageInfo.version, packageInfo.aiKey);
    }
}
exports.Reporter = Reporter;
function getPackageInfo(context) {
    // tslint:disable-next-line:non-literal-require
    let extensionPackage = require(context.asAbsolutePath('./package.json'));
    if (extensionPackage) {
        return {
            name: extensionPackage.name,
            version: extensionPackage.version,
            aiKey: extensionPackage.aiKey
        };
    }
    return undefined;
}
//# sourceMappingURL=telemetry.js.map