export class Detalle {
    constructor(public nombre:string, public cedula:string, public tipoEmpleado:string, public ingresoBruto: number, public descuentos: number, public ingresoNeto: number) {
        
    }

    public getDetalle():string{
        return 'D'+this.nombre+this.cedula+this.tipoEmpleado+this.ingresoBruto+this.descuentos+this.ingresoNeto;
    }
}