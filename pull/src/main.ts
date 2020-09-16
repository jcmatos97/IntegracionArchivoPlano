import { LectorArchivo } from "./lectorArchivo";

export class Main {

    constructor() {
        this.iniciar();
    }
    
    private async iniciar() {
        //Iniciar proceso para leer y exportar Datos a APAP
        let lector: LectorArchivo = (new LectorArchivo());

        console.log("Bienvenido a la Lectura y Exportacion de Archivos de Nómina de APAP");
        console.log("--------------------------------------------------------------------");
        console.log("Archivos ubicados en: \n"+lector.rutaExportacion);
        console.log("--------------------------------------------------------------------");

        //Obtenemos las rutas de los archivos para ofrecerlas como una opción en el menú
        let rutas: Array<string> = lector.obtenerRutas();

        //Obtenemos los nombres para mostrarlos en el menu
        let nombresDeArchivo: Array<string> = lector.obtenerNombresDeArchivo();

        //Imprimimos los nombres de archivos
        for (let index = 0; index < nombresDeArchivo.length; index++) {
            console.log(index+1+". "+nombresDeArchivo[index]);
        }
        //Obtenemos la información dada una ruta de un archivo
        await lector.pregunta_SeleccionArchivo();

        //Guardamos el contenido del archivo
        let contenidoArchivo: string = lector.leerArchivo(rutas[lector.indiceArchivo-1]);

        console.log("--------------------------------------------------------------------");
        console.log("Vista previa del archivo '"+nombresDeArchivo[lector.indiceArchivo-1]+"'");
        console.log("--------------------------------------------------------------------");
        console.log(contenidoArchivo);
        
        await lector.pregunta_ConfirmarExportacion(nombresDeArchivo[lector.indiceArchivo-1], contenidoArchivo);
    }
}

//Iniciar programa
(new Main());
