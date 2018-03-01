//Creamos el objeto Maquinaria

function Maquina(sModelo,iIdMaquina, sNombreMaquina, sDescMaquina, iPrecioAlquiler, dFechaCompra, iCompraMaq, sProv) 
{
    this.sModelo = sModelo;
    this.iIdMaquina = iIdMaquina;
    this.sNombreMaquina = sNombreMaquina;
    this.sDescMaquina = sDescMaquina;
    this.iPrecioAlquiler =  parseFloat(iPrecioAlquiler);
    this.dFechaCompra =  new Date(dFechaCompra);
    this.iCompraMaq = parseFloat(iCompraMaq);
    this.sProv = sProv;
    this.estado = true;
}

