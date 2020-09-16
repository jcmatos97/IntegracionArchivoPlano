"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDeDatos = void 0;
var BaseDeDatos = /** @class */ (function () {
    function BaseDeDatos(data) {
        //Importando los modulos para hacer un cliente SQL
        this.sql = require('mssql');
        this.config = {
            server: 'localhost',
            database: 'integracion_nomina',
            user: 'SAJC97',
            password: '12345',
            port: 1433
        };
        this.insertarEnBD(this.sql, ((data.split("\n"))));
    }
    BaseDeDatos.prototype.insertarEnBD = function (sql, data) {
        var dbConn = new sql.ConnectionPool(this.config);
        this.insertarNomina(sql, dbConn, data, this);
    };
    BaseDeDatos.prototype.insertarNomina = function (sql, dbConn, data, thisOBJ) {
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("insert into nomina(fecha) values('" + data[0].substr(4, 8) + "')  select SCOPE_IDENTITY()")
                .then(function (recordSet) {
                thisOBJ.insertarEncabezado(sql, data, thisOBJ, recordSet.recordset[0]['']);
                //dbConn.close();
            }).catch(function (err) {
                console.log(err);
                //dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    BaseDeDatos.prototype.insertarEncabezado = function (sql, data, thisOBJ, idNominaDB) {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            //Insertando Encabezado
            request.query("insert into encabezado values('" + data[0].substr(1, 3) + "','" + idNominaDB + "')")
                .then(function (recordSet) {
                //Insertando sumario
                thisOBJ.insertarSumario(sql, data, thisOBJ, idNominaDB);
                //dbConn.close();
            }).catch(function (err) {
                console.log(err);
                //dbConn.close();
            });
        });
    };
    BaseDeDatos.prototype.insertarDetalle = function (sql, data, thisOBJ, idNominaDB) {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("insert into detalle values('" + data.substr(1, 60) + "', '" + data.substr(61, 11) + "', '" + data.substr(72, 1) + "', '" + data.substr(73, 10) + "', '" + data.substr(83, 10) + "', '" + data.substr(93, 10) + "', " + idNominaDB + ")").then(function (recordSet) {
                thisOBJ.resumenRegistrosInsertados(sql, idNominaDB);
                //dbConn.close();
            }).catch(function (err) {
                console.log(err);
                //dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    BaseDeDatos.prototype.insertarSumario = function (sql, data, thisOBJ, idNominaDB) {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("insert into sumario values(" + data[data.length - 1].substr(1, 10) + ", " + idNominaDB + ")").then(function (recordSet) {
                for (var index = 1; index < (data.length - 1); index++) {
                    thisOBJ.insertarDetalle(sql, data[index], thisOBJ, idNominaDB);
                }
                //dbConn.close();
            }).catch(function (err) {
                console.log(err);
                //dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    BaseDeDatos.prototype.resumenRegistrosInsertados = function (sql, idNominaDB) {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("select n.id, n.fecha, e.codigoEntidad, s.numeroRegistros from nomina as n \n            inner join encabezado as e on n.id = e.idNomina \n            inner join sumario as s on n.id = s.idNomina\n            where n.id = " + idNominaDB + "\n            select * from detalle where idNomina= " + idNominaDB).then(function (recordSet) {
                console.log("Exportación Realizada con Éxito\nResumen de la Nómina Exportada:");
                console.log("--------------------------------------------------------------------");
                console.log("Fecha: " + recordSet.recordsets[0][0].fecha);
                console.log("Codigo de Entidad: " + recordSet.recordsets[0][0].codigoEntidad);
                console.log("Total de Registros de Empleado de Nómina: " + recordSet.recordsets[0][0].numeroRegistros);
                console.log("--------------------------------------------------------------------");
                console.log("Registros de Nomina:");
                console.log("-----------------------------------------------------------------------------------------------------------------------------------------");
                console.log("Nombre                                                      " + "  " + "Cedula     " + "  " + "Tipo de Empleado" + "  " + "Ingreso Bruto" + "  " + "Descuento " + "  Ingreso Neto");
                console.log("-----------------------------------------------------------------------------------------------------------------------------------------");
                recordSet.recordsets[1].forEach(function (e) {
                    console.log(e.nombre + "  " + e.cedula + "  " + e.tipoEmpleado + "                 " + e.ingresoBruto + "     " + e.descuento + "  " + e.ingresoNeto);
                });
                //dbConn.close();
                process.exit(1);
            }).catch(function (err) {
                console.log(err);
                //dbConn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    return BaseDeDatos;
}());
exports.BaseDeDatos = BaseDeDatos;
