"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrituraDeArchivo = void 0;
var EscrituraDeArchivo = /** @class */ (function () {
    function EscrituraDeArchivo(archivoNomina) {
        this.crearArchivo(archivoNomina);
    }
    EscrituraDeArchivo.prototype.crearArchivo = function (archivoNomina) {
        var fs = require('fs');
        fs.writeFile('nomina' + (this.fecha()) + '.txt', archivoNomina.getNomina(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('La Nomina ha sido generada con exito!');
        });
    };
    EscrituraDeArchivo.prototype.fecha = function () {
        var date = new Date();
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
    };
    return EscrituraDeArchivo;
}());
exports.EscrituraDeArchivo = EscrituraDeArchivo;
