"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encabezado = void 0;
var Encabezado = /** @class */ (function () {
    function Encabezado(codigoEntidad, fechaTransmision) {
        this.codigoEntidad = codigoEntidad;
        this.fechaTransmision = fechaTransmision;
    }
    Encabezado.prototype.getEncabezado = function () {
        return 'E' + this.codigoEntidad + this.fechaTransmision;
    };
    return Encabezado;
}());
exports.Encabezado = Encabezado;
