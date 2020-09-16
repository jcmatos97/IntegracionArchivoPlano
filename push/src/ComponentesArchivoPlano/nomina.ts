import { Encabezado } from "./encabezado";
import { Detalle } from "./detalle";
import { Sumario } from "./sumario";

export class Nomina {

    detalles: string;
    constructor(public encabezado: Encabezado, public detalle: Array<Detalle>, public sumario: Sumario) {
        this.detalles = "";
        detalle.forEach(element => {
            this.detalles += element.getDetalle()+"\n";
        }); 
    }

    public getNomina():string{
        return this.encabezado.getEncabezado()+"\n"+this.detalles+this.sumario.getSumario();
    }
}