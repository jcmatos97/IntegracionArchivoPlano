"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nomina = void 0;
var Nomina = /** @class */ (function () {
    function Nomina(encabezado, detalle, sumario) {
        var _this = this;
        this.encabezado = encabezado;
        this.detalle = detalle;
        this.sumario = sumario;
        this.detalles = "";
        detalle.forEach(function (element) {
            _this.detalles += element.getDetalle() + "\n";
        });
    }
    Nomina.prototype.getNomina = function () {
        return this.encabezado.getEncabezado() + "\n" + this.detalles + this.sumario.getSumario();
    };
    return Nomina;
}());
exports.Nomina = Nomina;
