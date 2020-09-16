export class Encabezado {
    constructor(public codigoEntidad:string, public fechaTransmision:string) {
        
    }

    public getEncabezado(): string{
        return 'E'+this.codigoEntidad+this.fechaTransmision;
    }
}