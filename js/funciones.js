//Transforma un array dado en un objeto Div con diferentes texto separados por br
function DeMensajesADiv(arrayMensajes){
    var oTexto=document.createElement("DIV");

        for(var i=0;i<arrayMensajes.length; i++){
            var sTexto = document.createTextNode(arrayMensajes[i]);
            oTexto.appendChild(sTexto);
            var oSalto=document.createElement("BR");
            oTexto.appendChild(oSalto);
        }

        mostrarMensaje(oTexto);
}

//Activa la clase error en formularios//
function claseError(oForm, iDiv) 
{
    var oInput = oForm.querySelectorAll("input, select")[iDiv];
    oInput.classList.add("is-invalid");
}

//Desactiva la clase error en formularios//
function quitarError(oForm, iDiv) 
{
    var oInput = oForm.querySelectorAll("input, select")[iDiv];
    oInput.classList.remove("is-invalid");
}

//Mostrar mensajes
function mostrarMensaje(sTexto,boolean) //El primer parámetro puede ser un String o un Nodo tipo Div
{
    oMensaje = document.querySelector("#mensajes");
    //oMensaje.classList.add("transicionMensaje");
    oAlerta = document.createElement("DIV");
    oAlerta.classList.add("alert");
    if(boolean)
        oAlerta.classList.add("alert-success");
    else
        oAlerta.classList.add("alert-danger");
    if(sTexto.nodeName!="DIV"){
        oTexto = document.createTextNode(sTexto);
        oAlerta.appendChild(oTexto);
    }

    else{
        oAlerta.appendChild(sTexto);
    }
    oMensaje.insertBefore(oAlerta, oMensaje.firstChild);
    setTimeout(function(){oAlerta.classList.add("transicionAlerta");},100);
    setTimeout(function(){oMensaje.lastChild.classList.remove("transicionAlerta");},4450);
    setTimeout(function(){oMensaje.removeChild(oMensaje.lastChild);},4500);
}



function obtenerActivos(arrayPersonas)
{
    var arrayFiltrado = [];

    for (var i = 0; i < arrayPersonas.length; i++) {
        if(arrayPersonas[i].estado)
            arrayFiltrado.push(arrayPersonas[i]);
    }

    return arrayFiltrado;
}

    
function crearCabecera(oFormulario,fila,col,descripcion)
{
    enlace = document.createElement("A");
    enlace.href="#";
    enlace.appendChild(document.createTextNode(descripcion));
    enlace.addEventListener("click", function(){ordenarFila(oFormulario,col)},false);

    fila.insertCell(-1).appendChild(enlace);

}


function calcularImporte(precioAlquiler, dtfechaInicio, dtfechaFin){

var msecPerMinute = 1000 * 60;
var msecPerHour = msecPerMinute * 60;
var msecPerDay = msecPerHour * 24;

var fechaInicio = dtfechaInicio.getTime();
var fechaFin = dtfechaFin.getTime();
var interval = fechaFin-fechaInicio;

var numDias = Math.floor(interval / msecPerDay );
if (numDias == 0)
    numDias=1;
var importe = parseFloat(precioAlquiler) * numDias;
//console.log(precioAlquiler);

return importe;
}


/************************FUNCIONES QUE DEVUELVEN UN ARRAY ESPECÍFICO*****************************/


//Devuelve un array de todas las máquinas que no están en el array 
//de alquileres pero estan activas.
function maquinasNoAlquiladasActivas()
{
    var aMaquinasNoAlquiladas = [];
    for (var i = 0; i < oGestion.maquinas.length; i++) {
        encontrado=false;
      for (var j = 0; j < oGestion.alquileres.length; j++) {
           if(oGestion.maquinas[i].iIdMaquina == oGestion.alquileres[j].idMaquina)
                if(oGestion.alquileres[j].estado)
                    encontrado=true;
        }
     if(!encontrado)
        if(oGestion.maquinas[i].estado)
            aMaquinasNoAlquiladas.push(oGestion.maquinas[i]);       
    }

    return aMaquinasNoAlquiladas;
}


//Devuelve un array de todas las máquinas que no están en el array de alquileres.
function maquinasNoAlquiladas()
{
    var aMaquinasNoAlquiladas = [];
    for (var i = 0; i < oGestion.maquinas.length; i++) {
        encontrado=false;
      for (var j = 0; j < oGestion.alquileres.length; j++) {
           if(oGestion.maquinas[i].iIdMaquina == oGestion.alquileres[j].idMaquina)
                if(oGestion.alquileres[j].estado)
                    encontrado=true;
        }
     if(!encontrado)
            aMaquinasNoAlquiladas.push(oGestion.maquinas[i]);       
    }

    return aMaquinasNoAlquiladas;
}

function maquinasAlquiladasActivas()
{
    var aMaquinasAlquiladas = [];
    for (var i = 0; i < oGestion.maquinas.length; i++) {
        encontrado=false;
      for (var j = 0; j < oGestion.alquileres.length; j++) {
           if(oGestion.maquinas[i].iIdMaquina == oGestion.alquileres[j].idMaquina)
                if(oGestion.alquileres[j].estado)
                    encontrado=true;
        }
     if(encontrado)
            aMaquinasAlquiladas.push(oGestion.maquinas[i]);       
    }

    return aMaquinasAlquiladas;
}


function alquileresNoFinalizados(){
    var aAlquileres = [];
    for (var i = 0; i < oGestion.alquileres.length; i++) {
        if(oGestion.alquileres[i].estado)
            aAlquileres.push(oGestion.alquileres[i]);
    }
    return aAlquileres;
}


/**Funciones Estadísticas***/

function totalImporteCompras()
{
    var total=0;
    for (var i = 0; i < oGestion.transacciones.length; i++) {
     if (oGestion.transacciones[i] instanceof Compra )
        total+=oGestion.transacciones[i].valor;
     }

    return total;
}

function totalImporteVentas()
{
    var total=0;
    for (var i = 0; i < oGestion.transacciones.length; i++) {
     if (oGestion.transacciones[i] instanceof Venta )
        total+=oGestion.transacciones[i].valor;    
    }

    return total;
}


function totalImporteAlquileresActivos(){

    var total=0;
    for (var i = 0; i < oGestion.alquileres.length; i++) {
     if (oGestion.alquileres[i].estado)
        total+=oGestion.alquileres[i].importe;    
    }
    return total;
}


function totalImporteAlquileresFinalizados(){

    var total=0;
    for (var i = 0; i < oGestion.alquileres.length; i++) {
     if (!oGestion.alquileres[i].estado)
        total+=oGestion.alquileres[i].importe;    
    }
    return total;
}



//-----------EXPRESIONES REGULARES ÚTILES------------

var oExpRegValidarId = /^[0-9]{3}$/;
var oExpRegValidarNombre = /^[a-zA-Z\s]{3,20}$/;
var oExpRegValidarTelefono = /^[679][0-9]{8}$/;
var oExpRegValidarApellidos = /^[a-zA-Z\s]{2,40}$/;
var oExpRegValidarDni = /^[[0-9]{8}[a-zA-Z]$/;
var oExpRegValidarDuracion = /^[0-9]{2,3}$/;
var oExpRegValidarIdioma = /^[a-zA-Z]{3,20}$/;
var oExpRegValidarTitulo = /^[a-zA-Z0-9\s]{3,40}$/;
var oExpRegValidarNumSegSocial = /^[0-9]{12}$/;
var oExpRegValidarPrecio = /^[0-9]{1,}\.?[0-9]{0,2}?$/;
var oExpRegValidarFecha = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
var oExpRegValidarHora = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
var oExpRegValidadCapacidad = /^(?!0).*[0-9]{2,3}$/;
var oExpRegValidarCP = /^[0-9]{5}$/;
var oExpRegDireccion=/^[/a-zA-Z\s]{5,80}\d+$/;
var oExpRegLocalidad = /^[a-zA-Z0-9\s]{3,40}$/;

var oExpRegValidarMod = /^[a-zA-Z\s\d]{3,20}$/;
var oExpRegValidarIdMaquina = /^[0-9]{3,9}$/;
var oExpRegValidarDescripcion = /^[a-zA-Z0-9\s]{10,140}$/;
var oExpRegValidarPrecioAlq = /^[0-9]{1,}\.?[0-9]{0,2}?$/;
var oExpRegValidarIdAlquiler = /^([A]{1}-\d+)$/;

var oExpRegValidarImporte = /^\d*\.?\d+(,\d+)?/;
var oExpRegValidarPrecio = /^[0-9]{1,}\.?[0-9]{0,2}?$/;
var oExpRegValidarId = /^[0-9]{3}$/; 
var oExpRegValidarIdTransaccion = /^([T]{1}-\d+)$/; 
var oExpRegValidarFecha = /^([0-2][0-9][0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
