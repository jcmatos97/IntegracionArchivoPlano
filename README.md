# Integracion de Archivos Planos
## Requisitos:
- La versión de Node utilizada en la creación del proyecto es: v10.16.3
- La versión de TypeScript utilizada en la creación del proyecto es: Version 3.9.7
```
npm install -g typescript@3.9.7
```
- Tener instalada el paquete mssql
```
npm install -g mssql 
```
## Push
Para exportar datos se debe iniciar el programa de consola con:
```
npm <ProjectPath>/push/dist/main.js
```
El programa generará un archivo .txt y lo exportará a /push

## Pull
- Ejecutar el query que se encuentra en <ProjectPath>/pull/queryDB.sql
- Modificar el archivo <ProjectPath>/pull/src/baseDeDatos.ts el siguiente fragmento, colocando cada dato de conexión correctamente:
```
private config = {  
        server: 'localhost',
        database: 'integracion_nomina',
        user: 'SAJC97',
        password: '12345',
        port: 1433
    };
```
- Ejecutar el comando *tsc* en la ruta <ProjectPath>/pull
- Para exportar datos se debe iniciar el programa de consola con:
```
npm <ProjectPath>/pull/dist/main.js
```
El programa de consola leerá los archivos ubicados en la ruta <ProjectPath>/pull/inputFile, de no ser correcto el formato, la aplicación dará un error
