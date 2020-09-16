import { Encabezado } from "./ComponentesArchivoPlano/encabezado";
import { Detalle } from "./ComponentesArchivoPlano/detalle";
import { Sumario } from "./ComponentesArchivoPlano/sumario";
import { Nomina } from "./ComponentesArchivoPlano/nomina";
import { EscrituraDeArchivo } from "./escrituraDeArchivo";

export class ColectorDeDatos {

    //Importamos el modulo Readline de NODEJS
    readline = require('readline');

    //Definimos la interface 
    rl = this.readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Variables que guardaran la información de los Readlines
    declare encabezado:Encabezado;
    declare encabezadoCodigoEntidad: string;
    declare encabezadoAnio: string;
    declare encabezadoMes: string;
    declare encabezadoDia: string;

    detalles = new Array<Detalle>();
    declare detalleNombre: string;
    declare detalleCedula: string;
    declare detalleTipoEmpleado: string;
    declare detalleIngresoBruto: number;
    declare detalleDescuentos: number;

    declare sumario: Sumario;

    declare nomina: Nomina;

    constructor() {
        this.iniciar();
    }

    private fixLenght(cadena: any, longitud: number):string {
        if((cadena as string).length > longitud){
            return (cadena as string).substr(0, longitud);
        }
        else if((cadena as String).length == longitud){
            return (cadena as string);
        }
        else{
            for (let index = (cadena as string).length; index < longitud; index++) {
                (cadena as string) += " ";
            }
            return (cadena as string);
        }
    }

    private question1(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Codigo de Entidad (3 Digitos):', (answer:string) => {
                this.encabezadoCodigoEntidad = this.fixLenght(answer, 3); 
                resolve();
            });
        });
    }

    private question2(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Año (4 digitos):', (answer:any) => {
                this.encabezadoAnio = this.fixLenght(answer, 4);
                resolve();
            });
        });
    }
    private question3(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Mes (2 digitos):', (answer:any) => {
                this.encabezadoMes = this.fixLenght(answer, 2);
                resolve();
            });
        });
        
    }
    
    private question4(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Día (2 digitos):', (answer:any) => {
                this.encabezadoDia = this.fixLenght(answer, 2);
                this.encabezado = new Encabezado(this.encabezadoCodigoEntidad, this.encabezadoAnio+this.encabezadoMes+this.encabezadoDia);
                resolve();
            });
        });
    }
    
    private question5(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Nombre (Maximo 60 dígitos):', (answer:any) => {
                this.detalleNombre = this.fixLenght(answer, 60);
                resolve();
            });
        });
    }
    
    private question6(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Cédula (11 dígitos):', (answer:any) => {
                this.detalleCedula = this.fixLenght(answer, 11);
                resolve();
            });
        });
    }
    
    private question7(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba la inicial del Tipo de Empleado \n(1 Dígito - T para Temporal, F para Fijo):', (answer:any) => {
                this.detalleTipoEmpleado = this.fixLenght(answer, 1);
                resolve();
            });
        });
    }
    
    private question8(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Ingreso Bruto (Máximo 10 dígitos):', (answer:any) => {
                this.detalleIngresoBruto = (this.fixLenght(answer, 10) as unknown as number);
                resolve();
            });
        });
    }
    
    private question9(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.rl.question('Escriba el Descuento (Máximo 10 dígitos):', (answer:any) => {
                this.detalleDescuentos = (this.fixLenght(answer, 10) as unknown as number);
                resolve();
            });
        });
    }
    
    private question10(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("--------------------------------------------------------");
            this.rl.question('¿Desea añadir otro empleado a la Nomina?(Y/N):', (answer:any) => {
                console.log("--------------------------------------------------------");
                if(answer == 'y' || answer == 'Y')
                {
                    this.detalles.push(new Detalle(this.detalleNombre, this.detalleCedula, this.detalleTipoEmpleado, this.detalleIngresoBruto, this.detalleDescuentos, this.detalleIngresoBruto-this.detalleDescuentos));
                    this.detalle();
                }
                else if(answer == 'n' || answer == 'N' )
                {
                    this.detalles.push(new Detalle(this.detalleNombre, this.detalleCedula, this.detalleTipoEmpleado, this.detalleIngresoBruto, this.detalleDescuentos, this.detalleIngresoBruto-this.detalleDescuentos));
                    this.sumario = new Sumario(this.detalles.length);
                    this.nomina = new Nomina(this.encabezado, this.detalles, this.sumario);
                    (new EscrituraDeArchivo(this.nomina));
                    this.rl.close();
                }
                resolve();
            });
        });
    }

    private async detalle(): Promise<void> {
        console.log("--------------------------------------------------------");
        console.log("Seccion de Detalle");
        console.log("--------------------------------------------------------");
        await this.question5();
        await this.question6();
        await this.question7();
        await this.question8();
        await this.question9();
        await this.question10();
    }
 
    private async iniciar(): Promise<void>  {
        console.log("Bienvenido a la creación del archivo de nómina de UNAPEC");
        console.log("--------------------------------------------------------");
        console.log("Seccion de Encabezado");
        console.log("--------------------------------------------------------");
        await this.question1();
        await this.question2();
        await this.question3();
        await this.question4();
        this.detalle();
    }
}