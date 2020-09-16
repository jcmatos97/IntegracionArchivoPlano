"use strict";
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var lectorArchivo_1 = require("./lectorArchivo");
var Main = /** @class */ (function () {
    function Main() {
        this.iniciar();
    }
    Main.prototype.iniciar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lector, rutas, nombresDeArchivo, index, contenidoArchivo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lector = (new lectorArchivo_1.LectorArchivo());
                        console.log("Bienvenido a la Lectura y Exportacion de Archivos de Nómina de APAP");
                        console.log("--------------------------------------------------------------------");
                        console.log("Archivos ubicados en: \n" + lector.rutaExportacion);
                        console.log("--------------------------------------------------------------------");
                        rutas = lector.obtenerRutas();
                        nombresDeArchivo = lector.obtenerNombresDeArchivo();
                        //Imprimimos los nombres de archivos
                        for (index = 0; index < nombresDeArchivo.length; index++) {
                            console.log(index + 1 + ". " + nombresDeArchivo[index]);
                        }
                        //Obtenemos la información dada una ruta de un archivo
                        return [4 /*yield*/, lector.pregunta_SeleccionArchivo()];
                    case 1:
                        //Obtenemos la información dada una ruta de un archivo
                        _a.sent();
                        contenidoArchivo = lector.leerArchivo(rutas[lector.indiceArchivo - 1]);
                        console.log("--------------------------------------------------------------------");
                        console.log("Vista previa del archivo '" + nombresDeArchivo[lector.indiceArchivo - 1] + "'");
                        console.log("--------------------------------------------------------------------");
                        console.log(contenidoArchivo);
                        return [4 /*yield*/, lector.pregunta_ConfirmarExportacion(nombresDeArchivo[lector.indiceArchivo - 1], contenidoArchivo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Main;
}());
exports.Main = Main;
//Iniciar programa
(new Main());
