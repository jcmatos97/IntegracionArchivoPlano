"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sumario = void 0;
var Sumario = /** @class */ (function () {
    function Sumario(cantidadRegistros) {
        this.cantidadRegistros = cantidadRegistros;
    }
    Sumario.prototype.getSumario = function () {
        return 'S' + this.cantidadRegistros;
    };
    return Sumario;
}());
exports.Sumario = Sumario;
