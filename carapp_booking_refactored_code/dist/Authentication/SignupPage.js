var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";
import { getUser, signup } from "../Services/userService";
import "./SignupPage.css";
import React from "react";
var schema = z
    .object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." }),
    role: z.string(),
});
var SignupPage = function () {
    var _a = useState(""), formError = _a[0], setFormError = _a[1];
    var _b = useForm({ resolver: zodResolver(schema) }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
    var onSubmit = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, signup(formData)];
                case 1:
                    _a.sent();
                    window.location.href = "/";
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    if (err_1.response && err_1.response.status === 400) {
                        setFormError(err_1.response.data.message);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (getUser()) {
        return React.createElement(Navigate, { to: '/' });
    }
    return (React.createElement("section", { className: 'align_center form_page' },
        React.createElement("form", { className: 'authentication_form signup_form', onSubmit: handleSubmit(onSubmit) },
            React.createElement("h2", null, "SignUp "),
            React.createElement("div", { className: 'form_inputs signup_form_input' },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: 'name' }, "Name"),
                    React.createElement("input", __assign({ id: 'name', className: 'form_text_input', type: 'text', placeholder: 'Enter your name' }, register("name", { required: true }))),
                    errors.name && (React.createElement("em", { className: 'form_error' }, errors.name.message))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: 'email' }, "Email"),
                    React.createElement("input", __assign({ id: 'email', className: 'form_text_input', type: 'email', placeholder: 'Enter your email address' }, register("email", { required: true }))),
                    errors.email && (React.createElement("em", { className: 'form_error' }, errors.email.message))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: 'password' }, "Password"),
                    React.createElement("input", __assign({ id: 'password', className: 'form_text_input', type: 'password', placeholder: 'Enter your password' }, register("password", { required: true }))),
                    errors.password && (React.createElement("em", { className: 'form_error' }, errors.password.message))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: 'role' }, "Role"),
                    React.createElement("select", __assign({ id: 'role', className: 'form_text_input' }, register("role")),
                        React.createElement("option", { value: '' }, "Select Role"),
                        React.createElement("option", { value: 'user' }, "User"),
                        React.createElement("option", { value: 'admin' }, "Admin")))),
            formError && React.createElement("em", { className: 'form_error' }, formError),
            React.createElement("button", { className: 'search_button form_submit', type: 'submit' }, "Submit"))));
};
export default SignupPage;
