import { BaseDeDatos } from "./baseDeDatos";

export class LectorArchivo {
    //indice del archivo a Exportar
    declare indiceArchivo: number;

    //Confirmar Exportacion
    declare confirmarExportacion: string;

    //Importando los modulos path y fs
    private path = require('path');
    private fs = require('fs');

    //Importamos el modulo Readline de NODEJS
    readline = require('readline');

    //Definimos la interface para las preguntas
    rl = this.readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    public rutaExportacion = this.path.join(__dirname.slice(0, -4), 'inputFile');

    constructor() {
        
    }
    
    public obtenerRutas(): Array<string> {
        //Creando la ruta
        const directoryPath = this.path.join(__dirname.slice(0, -4), 'inputFile');

        //Variable para guardar las rutas de los archivos planos
        let rutasArchivo:Array<string> = new Array<string>();

        //Variable para 
        let nombreArchivos: Array<string> = new Array<string>();

        //Obteniendo los nombres de los archivos
        nombreArchivos = (this.fs.readdirSync(directoryPath));

        //Creando las rutas con los nombres
        nombreArchivos.forEach(element => {
            rutasArchivo.push(this.path.join(directoryPath, element));
        });

        return rutasArchivo;
    }

    public obtenerNombresDeArchivo(): Array<string> {
        //Creando la ruta
        const directoryPath = this.path.join(__dirname.slice(0, -4), 'inputFile');

        //Obteniendo los nombres de los archivos
        return (this.fs.readdirSync(directoryPath));
    }

    public leerArchivo(rutaArchivo: string): string {
        //Variable para el Contenido del archivo
        let contenidoArchivo: string;

        //Obteniendo los datos del archivo
        contenidoArchivo = this.fs.readFileSync(rutaArchivo, 'utf8');

        return contenidoArchivo;
    }

    public async pregunta_SeleccionArchivo(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el número correspondiente al archivo mostrado en la lista mostrada:', (answer:any) => {
                this.indiceArchivo = (answer as number);
                resolve();
            });
        });
    }

    public async pregunta_ConfirmarExportacion(nombresDeArchivo: string, data: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("--------------------------------------------------------------------");
            this.rl.question("¿Desea exportar los datos de '"+nombresDeArchivo+"' a la Base de Datos? (Y/N):", (answer:any) => {
                this.confirmarExportacion = (answer as string);
                if(this.confirmarExportacion == "Y" || this.confirmarExportacion == "y"){
                    console.log("Exportando...");
                    (new BaseDeDatos(data));
                }
                else if(this.confirmarExportacion == "N" || this.confirmarExportacion == "n"){
                    resolve();
                    process.exit(1);
                }
                else{
                    resolve();
                    process.exit(1);
                }
            });
        });
    }
}