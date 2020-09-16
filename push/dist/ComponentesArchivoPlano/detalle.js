"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle = void 0;
var Detalle = /** @class */ (function () {
    function Detalle(nombre, cedula, tipoEmpleado, ingresoBruto, descuentos, ingresoNeto) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.tipoEmpleado = tipoEmpleado;
        this.ingresoBruto = ingresoBruto;
        this.descuentos = descuentos;
        this.ingresoNeto = ingresoNeto;
    }
    Detalle.prototype.getDetalle = function () {
        return 'D' + this.nombre + this.cedula + this.tipoEmpleado + this.ingresoBruto + this.descuentos + this.ingresoNeto;
    };
    return Detalle;
}());
exports.Detalle = Detalle;
