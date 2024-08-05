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
import React, { useState, useEffect } from 'react';
import './CarForm.css';
var CarForm = function (_a) {
    var car = _a.car, onSave = _a.onSave;
    var _b = useState({
        id: '',
        brand: '',
        color: '',
        name: '',
        type: '',
        description: '',
        price: '',
        year: '',
        image: ''
    }), formData = _b[0], setFormData = _b[1];
    useEffect(function () {
        if (car) {
            setFormData(car);
        }
    }, [car]);
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        onSave(formData);
    };
    return (React.createElement("form", { className: 'car-form', onSubmit: handleSubmit },
        React.createElement("input", { type: "number", name: "id", value: formData.id, onChange: handleChange, placeholder: "id" }),
        React.createElement("input", { type: "text", name: "brand", value: formData.brand, onChange: handleChange, placeholder: "Brand" }),
        React.createElement("input", { type: "text", name: "color", value: formData.color, onChange: handleChange, placeholder: "Color" }),
        React.createElement("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, placeholder: "Name" }),
        React.createElement("input", { type: "text", name: "type", value: formData.type, onChange: handleChange, placeholder: "Type" }),
        React.createElement("input", { type: "text", name: "description", value: formData.description, onChange: handleChange, placeholder: "Description" }),
        React.createElement("input", { type: "number", name: "price", value: formData.price, onChange: handleChange, placeholder: "Price" }),
        React.createElement("input", { type: "number", name: "year", value: formData.year, onChange: handleChange, placeholder: "Year" }),
        React.createElement("input", { type: "text", name: "image", value: formData.image, onChange: handleChange, placeholder: "Image URL" }),
        React.createElement("button", { type: "submit" }, "Save")));
};
export default CarForm;
