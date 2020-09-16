export class Sumario {
    constructor(public cantidadRegistros: number) {
        
    }

    public getSumario():string{
        return 'S'+this.cantidadRegistros;
    }
}