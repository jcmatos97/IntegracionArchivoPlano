import { Nomina } from "./ComponentesArchivoPlano/nomina";

export class EscrituraDeArchivo {
    constructor(archivoNomina: Nomina) {
        this.crearArchivo(archivoNomina)
    }

    private crearArchivo(archivoNomina: Nomina): void {
        let fs = require('fs');
        fs.writeFile('nomina'+(this.fecha())+'.txt', archivoNomina.getNomina(),  (err:any) => {
            if (err)
            {
                return console.log(err);
            }
            console.log('La Nomina ha sido generada con exito!');
        });
    }

    private fecha(): any {
        let date = new Date()
            var mm = date.getMonth() + 1; // getMonth() is zero-based
            var dd = date.getDate();
            return [date.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('');
    }

}

