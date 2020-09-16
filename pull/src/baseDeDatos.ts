export class BaseDeDatos {
    //Importando los modulos para hacer un cliente SQL
    private sql = require('mssql');

    private config = {  
        server: 'localhost',
        database: 'integracion_nomina',
        user: 'SAJC97',
        password: '12345',
        port: 1433
    };

    constructor(data: string) {
        this.insertarEnBD(this.sql, ((data.split("\n"))));
    }
    
    private insertarEnBD(sql: any, data: Array<string>): void{
        var dbConn = new sql.ConnectionPool(this.config);
        this.insertarNomina(sql, dbConn, data, this);
    }

    private insertarNomina(sql: any, dbConn:any, data: Array<string>, thisOBJ: BaseDeDatos): void {
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn); 
            request.query("insert into nomina(fecha) values('"+data[0].substr(4,8)+"')  select SCOPE_IDENTITY()")
            .then(function (recordSet: any) {
                thisOBJ.insertarEncabezado(sql, data, thisOBJ, recordSet.recordset[0]['']);
                //dbConn.close();
            }).catch(function (err: any) {
                console.log(err);
                //dbConn.close();
            });

        }).catch(function (err:any) {
            console.log(err);
        });
    }     

    private insertarEncabezado(sql: any, data: Array<string>, thisOBJ: BaseDeDatos, idNominaDB: number): void {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn); 
            //Insertando Encabezado
            request.query("insert into encabezado values('"+data[0].substr(1,3)+"','"+idNominaDB+"')")
            .then(function (recordSet: any) {
                //Insertando sumario
                thisOBJ.insertarSumario(sql, data, thisOBJ, idNominaDB);
                //dbConn.close();
            }).catch(function (err: any) {
                console.log(err);
                //dbConn.close();
            });                        
        });
    }    

    private insertarDetalle(sql: any, data: string, thisOBJ: BaseDeDatos, idNominaDB: number): void {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("insert into detalle values('"+data.substr(1,60)+"', '"+data.substr(61, 11)+"', '"+data.substr(72, 1)+"', '"+data.substr(73, 10)+"', '"+data.substr(83, 10)+"', '"+data.substr(93, 10)+"', "+idNominaDB+")").then(function (recordSet: any) {
                thisOBJ.resumenRegistrosInsertados(sql, idNominaDB);
                //dbConn.close();
            }).catch(function (err: any) {
                console.log(err);
                //dbConn.close();
            })
        }).catch(function (err:any) {
            console.log(err);
        });
    }    

    private insertarSumario(sql: any, data: Array<string>, thisOBJ: BaseDeDatos, idNominaDB: number): void {
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query("insert into sumario values("+data[data.length-1].substr(1,10)+", "+idNominaDB+")").then(function (recordSet: any) {
                for (let index = 1; index < (data.length-1); index++) {
                    thisOBJ.insertarDetalle(sql, data[index], thisOBJ, idNominaDB);
                }
                //dbConn.close();
            }).catch(function (err: any) {
                console.log(err);
                //dbConn.close();
            })
        }).catch(function (err:any) {
            console.log(err);
        });
    }

    private resumenRegistrosInsertados(sql: any, idNominaDB: number): void{
        var dbConn = new sql.ConnectionPool(this.config);
        dbConn.connect().then(function () {
            var request = new sql.Request(dbConn);
            request.query(`select n.id, n.fecha, e.codigoEntidad, s.numeroRegistros from nomina as n 
            inner join encabezado as e on n.id = e.idNomina 
            inner join sumario as s on n.id = s.idNomina
            where n.id = ${idNominaDB}
            select * from detalle where idNomina= ${idNominaDB}`).then(function (recordSet: any) {
                console.log("Exportación Realizada con Éxito\nResumen de la Nómina Exportada:");
                console.log("--------------------------------------------------------------------");
                console.log("Fecha: "+(recordSet.recordsets[0][0].fecha as string));
                console.log("Codigo de Entidad: "+recordSet.recordsets[0][0].codigoEntidad);
                console.log("Total de Registros de Empleado de Nómina: "+recordSet.recordsets[0][0].numeroRegistros);
                console.log("--------------------------------------------------------------------");
                console.log("Registros de Nomina:");
                console.log("-----------------------------------------------------------------------------------------------------------------------------------------");
                console.log("Nombre                                                      "+"  "+"Cedula     "+"  "+"Tipo de Empleado"+"  "+"Ingreso Bruto"+"  "+"Descuento "+"  Ingreso Neto");
                console.log("-----------------------------------------------------------------------------------------------------------------------------------------");
                recordSet.recordsets[1].forEach((e: any) => {
                    console.log(e.nombre+"  "+e.cedula+"  "+e.tipoEmpleado+"                 "+e.ingresoBruto+"     "+e.descuento+"  "+e.ingresoNeto);
                });

                //dbConn.close();
                process.exit(1);
            }).catch(function (err: any) {
                console.log(err);
                //dbConn.close();
            })
        }).catch(function (err:any) {
            console.log(err);
        });
    }
}
