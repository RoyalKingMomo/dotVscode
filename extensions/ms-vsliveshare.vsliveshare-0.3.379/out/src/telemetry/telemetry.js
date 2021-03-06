"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//
//  Copyright (c) Microsoft Corporation. All rights reserved.
//
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const path = require("path");
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const util_1 = require("../util");
const traceSource_1 = require("../tracing/traceSource");
const config = require("../config");
const rpcTelemetry_1 = require("./rpcTelemetry");
const telemetryStrings_1 = require("./telemetryStrings");
class Telemetry {
    constructor() {
        // For transition events
        this.transitionSeq = 0;
        this.lastTransitionTime = (new Date()).getTime();
        let packageJsonPath = path.join(__dirname, '..', '..', '..', 'package.json');
        const { name, version, aiKey } = require(packageJsonPath);
        this.reporter = new vscode_extension_telemetry_1.default(name, version, aiKey);
        this.contextProperties = {};
        this.collaborating = false;
    }
    static get Instance() {
        if (!Telemetry.singleton) {
            Telemetry.singleton = new Telemetry();
        }
        return Telemetry.singleton;
    }
    addContextProperty(property, value, isPII = false) {
        // no need to set `undefined` values
        if (value === undefined) {
            return;
        }
        const valueString = String(value);
        if (isPII && !config.get(config.Key.canCollectPII)) {
            this.contextProperties[property] = traceSource_1.Privacy.getShortHash(valueString);
        }
        else {
            this.contextProperties[property] = valueString;
        }
    }
    removeContextProperty(property) {
        delete this.contextProperties[property];
    }
    addContextPropertiesToObject(properties) {
        return Object.assign({}, this.contextProperties, properties);
    }
    sendTelemetryEvent(eventName, properties, measures) {
        this.reporter.sendTelemetryEvent(eventName, this.addContextPropertiesToObject(properties), measures);
    }
    sendFault(eventName, type, details, exception, correlatedEvent) {
        (new Fault(eventName, type, details, exception, correlatedEvent)).send();
    }
    sendShareFault(type, details, exception, correlatedEvent) {
        this.sendFault(telemetryStrings_1.TelemetryEventNames.SHARE_FAULT, type, details, exception, correlatedEvent);
    }
    sendJoinFault(type, details, exception, correlatedEvent) {
        this.sendFault(telemetryStrings_1.TelemetryEventNames.JOIN_FAULT, type, details, exception, correlatedEvent);
    }
    sendSignInFault(type, details, exception, correlatedEvent) {
        this.sendFault(telemetryStrings_1.TelemetryEventNames.SIGN_IN_FAULT, type, details, exception, correlatedEvent);
    }
    sendActivateExtensionFault(type, details, exception, correlatedEvent) {
        this.sendFault(telemetryStrings_1.TelemetryEventNames.ACTIVATE_EXTENSION_FAULT, type, details, exception, correlatedEvent);
    }
    sendDeactivateExtensionFault(type, details, exception, correlatedEvent) {
        this.sendFault(telemetryStrings_1.TelemetryEventNames.DEACTIVATE_EXTENSION_FAULT, type, details, exception, correlatedEvent);
    }
    sendActivateAgentAsyncFault(type, details, exception, correlatedEvent) {
        this.sendFault(telemetryStrings_1.TelemetryEventNames.ACTIVATE_AGENTASYNC_FAULT, type, details, exception, correlatedEvent);
    }
    sendTransition(currentState, nextState, fromAction) {
        let currentTime = (new Date()).getTime();
        let timeSinceLastTransition = currentTime - this.lastTransitionTime;
        this.lastTransitionTime = currentTime;
        let transitionTelemetryEvent = new TelemetryEvent(telemetryStrings_1.TelemetryEventNames.TRANSITION);
        transitionTelemetryEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.CURRENT_STATE, currentState);
        transitionTelemetryEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.NEXT_STATE, nextState);
        transitionTelemetryEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.TRANSITION_ACTION, fromAction);
        transitionTelemetryEvent.addMeasure(telemetryStrings_1.TelemetryPropertyNames.TRANSITION_SEQUENCE, this.transitionSeq++);
        transitionTelemetryEvent.addMeasure(telemetryStrings_1.TelemetryPropertyNames.TIME_SINCE_LAST_TRANSITION, timeSinceLastTransition);
        transitionTelemetryEvent.send();
    }
    versionCheckFail(platformName, platformVersion, versionInfoServicePack) {
        let versionCheckFailFault = new Fault(telemetryStrings_1.TelemetryEventNames.VERSION_CHECK_FAIL, FaultType.User, 'Version check failed.');
        versionCheckFailFault.addProperty(telemetryStrings_1.TelemetryPropertyNames.VERSION_PLATFORMNAME, platformName);
        versionCheckFailFault.addProperty(telemetryStrings_1.TelemetryPropertyNames.VERSION_PLATFORMVERSION, platformVersion);
        versionCheckFailFault.addProperty(telemetryStrings_1.TelemetryPropertyNames.VERSION_PLATFORMVERSION_SERVICEPACK, String(versionInfoServicePack));
        versionCheckFailFault.send();
    }
    startSession(isHost) {
        this.sessionEvent = this.startTimedEvent(telemetryStrings_1.TelemetryEventNames.SESSION);
        this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.IS_HOST, isHost);
    }
    endSession(guestsByIDE, distinctGuestsByIDE) {
        this.sessionEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.GUESTS_BY_IDE, JSON.stringify(guestsByIDE));
        this.sessionEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.DISTINCT_GUESTS_BY_IDE, JSON.stringify(distinctGuestsByIDE));
        this.sessionEvent.end(TelemetryResult.Success);
        rpcTelemetry_1.RpcTelemetry.postRequestSummaries();
        this.removeContextProperty(telemetryStrings_1.TelemetryPropertyNames.IS_HOST);
    }
    startTimedEvent(eventName, correlate = false) {
        return new TimedEvent(eventName, correlate);
    }
    setUserInfo(userInfo) {
        if (!(userInfo && userInfo.emailAddress)) {
            return;
        }
        if (userInfo.emailAddress !== config.get(config.Key.userEmail)) {
            config.save(config.Key.userEmail, userInfo.emailAddress);
        }
        if (userInfo.emailAddress.endsWith('microsoft.com') && !config.get(config.Key.isInternal)) {
            config.save(config.Key.isInternal, true);
            this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.IS_INTERNAL, 'true');
        }
    }
    setServiceEndpoint(serviceEndpoint) {
        this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.SERVICE_ENDPOINT, serviceEndpoint);
    }
    setSettingsContextProperties() {
        this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.IS_INTERNAL, config.get(config.Key.isInternal) ? 'true' : 'false');
        this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.USER_TEAM_STATUS, config.get(config.Key.teamStatus));
        this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.CONNECTION_MODE, config.get(config.Key.connectionMode));
        this.addContextProperty(telemetryStrings_1.TelemetryPropertyNames.FEATURE_FLAGS, JSON.stringify(config.featureFlags));
    }
    setCorrelationEvent(correlationEvent) {
        this.correlationEvent = correlationEvent;
    }
    removeCorrelationEvent(correlationEvent) {
        if (this.correlationEvent === correlationEvent) {
            this.correlationEvent = undefined;
        }
    }
    correlate(telemetryEvent) {
        if (this.correlationEvent) {
            telemetryEvent.correlateWith(this.correlationEvent);
        }
    }
    httpRequestComplete(requestUri, requestUriMask, requestMethod, responseStatusCode, responseReasonPhrase, clientTiming, serverTimingDiagnostics, serverDependencyDiagnostics, correlationId, hadException, exceptionMessage) {
        let httpRequestCompleteEvent = new TelemetryEvent(telemetryStrings_1.TelemetryEventNames.HTTP_REQUEST_COMPLETE);
        this.correlate(httpRequestCompleteEvent);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_REQUEST_URI_MASK, requestUriMask);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_REQUEST_METHOD, requestMethod);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_REQUEST_STATUS_CODE, responseStatusCode);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_REQUEST_REASON_PHRASE, responseReasonPhrase);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_CLIENT_TIMING, clientTiming);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_SERVER_TIMING_DIAGNOSTICS, serverTimingDiagnostics);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_HAD_EXCEPTION, hadException);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_EXCEPTION_MESSAGE, exceptionMessage);
        httpRequestCompleteEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.HTTP_CORRELATION_ID, correlationId);
        httpRequestCompleteEvent.send();
    }
    genericOperation(eventName, result, payload) {
        let genericOperationEvent = new TelemetryEvent(eventName);
        this.correlate(genericOperationEvent);
        genericOperationEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.EVENT_RESULT, this.capitalizeFirstChar(result));
        for (let key in payload) {
            if (payload.hasOwnProperty(key)) {
                const value = payload[key] === undefined
                    || payload[key] === null ? undefined : payload[key].toString();
                genericOperationEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.FEATURE_NAME + this.capitalizeFirstChar(key), value);
            }
        }
        genericOperationEvent.send();
    }
    capitalizeFirstChar(content) {
        return content.charAt(0).toUpperCase() + content.slice(1);
    }
}
const Instance = Telemetry.Instance;
exports.Instance = Instance;
class TelemetryEvent {
    constructor(eventName, correlate = false) {
        this.eventName = eventName;
        this.properties = {};
        this.measures = {};
        this.correlationId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        if (correlate) {
            Instance.correlate(this);
        }
    }
    static create(property, data) {
        const correlate = data ? !!data.correlate : false;
        const telemetryEvent = new TelemetryEvent(property, correlate);
        if (data.properties) {
            Object.keys(data.properties)
                .forEach(key => telemetryEvent.addProperty(telemetryStrings_1.TelemetryPropertyNames.FEATURE_NAME + key, data.properties[key]));
        }
        if (data.measures) {
            Object.keys(data.measures)
                .forEach(key => telemetryEvent.addMeasure(telemetryStrings_1.TelemetryPropertyNames.FEATURE_NAME + key, data.measures[key]));
        }
        return telemetryEvent;
    }
    addProperty(property, value, isPII = false) {
        // no need to set `undefined` values
        if (value === undefined) {
            return;
        }
        const valueString = String(value);
        if (isPII && !config.get(config.Key.canCollectPII)) {
            this.properties[property] = traceSource_1.Privacy.getShortHash(valueString);
        }
        else {
            this.properties[property] = valueString;
        }
    }
    propertyExists(property) {
        return property in this.properties;
    }
    addMeasure(measure, value) {
        this.measures[measure] = value;
    }
    getCorrelationId() {
        return this.correlationId;
    }
    correlateWith(otherEvent) {
        this.correlationId = otherEvent.getCorrelationId();
    }
    correlateWithId(correlationId) {
        this.correlationId = correlationId;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addMeasure(telemetryStrings_1.TelemetryPropertyNames.CORRELATION_ID, this.correlationId);
            Instance.sendTelemetryEvent(this.eventName, this.properties, this.measures);
        });
    }
}
exports.TelemetryEvent = TelemetryEvent;
function removeEmailAddresses(str) {
    return str.replace(/[\S]+@[\S]+/gi, '[EMAIL]');
}
function cleanSensitiveInformation(str) {
    return str ? removeEmailAddresses(util_1.PathUtil.removePath(str, '[PATH]/')) : str;
}
exports.cleanSensitiveInformation = cleanSensitiveInformation;
class Fault extends TelemetryEvent {
    constructor(eventName, type, details, exception, correlatedEvent) {
        super(eventName);
        this.addProperty(telemetryStrings_1.TelemetryPropertyNames.FAULT_TYPE, FaultType[type]);
        if (details) {
            this.addProperty(telemetryStrings_1.TelemetryPropertyNames.EVENT_MESSAGE, cleanSensitiveInformation(details));
        }
        let exceptionStack = '';
        if (exception && exception instanceof vscode_jsonrpc_1.ResponseError) {
            if (exception.code && typeof exception.code === 'number') {
                this.addMeasure(telemetryStrings_1.TelemetryPropertyNames.EVENT_EXCEPTION_CODE, exception.code);
            }
            if (exception.data && typeof exception.data === 'string') {
                // RPC response errors have the remote stack trace in the data property.
                exceptionStack += cleanSensitiveInformation(exception.data) +
                    '\n   --- End of remote exception stack trace ---\n';
            }
        }
        if (exception && exception.stack && typeof exception.stack === 'string') {
            exceptionStack += cleanSensitiveInformation(exception.stack);
        }
        if (!exceptionStack) {
            exceptionStack = 'No Stack';
        }
        this.addProperty(telemetryStrings_1.TelemetryPropertyNames.EVENT_EXCEPTION_STACK, exceptionStack);
        if (correlatedEvent) {
            this.correlateWith(correlatedEvent);
        }
    }
    attachClientLog(numLines) {
        return __awaiter(this, void 0, void 0, function* () {
            if (numLines > 0) {
                try {
                    let lastClientLogLines = yield util_1.ExtensionUtil.readLastNLinesFromFile(util_1.ExtensionUtil.getClientLogFilePath(), numLines);
                    this.addProperty(telemetryStrings_1.TelemetryPropertyNames.CLIENT_LOG_LINES, cleanSensitiveInformation(lastClientLogLines));
                }
                catch (_a) { }
            }
        });
    }
    attachAgentLog(numLines) {
        return __awaiter(this, void 0, void 0, function* () {
            if (numLines > 0) {
                try {
                    let lastAgentLogLines = yield util_1.ExtensionUtil.readLastNLinesFromFile(util_1.ExtensionUtil.agentLogFilePath, numLines);
                    this.addProperty(telemetryStrings_1.TelemetryPropertyNames.AGENT_LOG_LINES, cleanSensitiveInformation(lastAgentLogLines));
                }
                catch (_a) { }
            }
        });
    }
    send(clientLines = 50, agentLines = 50) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.attachClientLog(clientLines);
            yield this.attachAgentLog(agentLines);
            return _super("send").call(this);
        });
    }
}
exports.Fault = Fault;
class TimedEvent extends TelemetryEvent {
    constructor(eventName, correlate = false) {
        super(eventName, correlate);
        this.startTime = (new Date()).getTime();
        this.lastMarkTime = this.startTime;
        TimedEvent.scopeStack.push(this);
    }
    markTime(markName, fromStart = false) {
        let currentTime = (new Date()).getTime();
        let duration = fromStart ? (currentTime - this.startTime) : (currentTime - this.lastMarkTime);
        this.lastMarkTime = currentTime;
        this.addMeasure(markName, duration);
    }
    end(result, message, sendNow = true) {
        this.addProperty(telemetryStrings_1.TelemetryPropertyNames.EVENT_RESULT, TelemetryResult[result]);
        if (message) {
            this.addProperty(telemetryStrings_1.TelemetryPropertyNames.EVENT_MESSAGE, cleanSensitiveInformation(message));
        }
        this.markTime(telemetryStrings_1.TelemetryPropertyNames.EVENT_DURATION, true);
        Instance.removeCorrelationEvent(this);
        if (sendNow) {
            this.send();
        }
        for (let i = TimedEvent.scopeStack.length - 1; i >= 0; i--) {
            if (TimedEvent.scopeStack[i] === this) {
                TimedEvent.scopeStack.splice(i, 1);
            }
        }
    }
    static propagateOffsetMarkTime(markName, markEvent) {
        for (let i = 0; i < TimedEvent.scopeStack.length; i++) {
            const targetEvent = TimedEvent.scopeStack[i];
            if (targetEvent !== markEvent) {
                targetEvent.markTime(markName);
            }
        }
    }
}
TimedEvent.scopeStack = [];
exports.TimedEvent = TimedEvent;
var FaultType;
(function (FaultType) {
    FaultType[FaultType["Error"] = 0] = "Error";
    FaultType[FaultType["User"] = 1] = "User";
    FaultType[FaultType["Unknown"] = 2] = "Unknown";
    FaultType[FaultType["NonBlockingFault"] = 3] = "NonBlockingFault";
})(FaultType = exports.FaultType || (exports.FaultType = {}));
var TelemetryResult;
(function (TelemetryResult) {
    TelemetryResult[TelemetryResult["Cancel"] = 0] = "Cancel";
    TelemetryResult[TelemetryResult["Success"] = 1] = "Success";
    TelemetryResult[TelemetryResult["Failure"] = 2] = "Failure";
    TelemetryResult[TelemetryResult["UserFailure"] = 3] = "UserFailure";
    TelemetryResult[TelemetryResult["IndeterminateFailure"] = 4] = "IndeterminateFailure";
})(TelemetryResult = exports.TelemetryResult || (exports.TelemetryResult = {}));

//# sourceMappingURL=telemetry.js.map
