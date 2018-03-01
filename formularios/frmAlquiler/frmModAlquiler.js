$('#frmModAlquiler .comboAlquileres').keyup(function(){cargarComboAlquileres("frmModAlquiler","todos")});

var oBtnModAlquiler1 = $("#frmModAlquiler #cargarSiguienteFormulario")[0];
oBtnModAlquiler1.addEventListener("click", cargarAlquiler, false);

var oBtnModAlquiler1 = $("#frmModAlquilerSeleccionado #btnActualizarAlquiler")[0];
oBtnModAlquiler1.addEventListener("click", actualizarAlquiler, false);

var oBtnModAlquiler2 = $("#menuAlquileres a[name='Modificar']")[0];
oBtnModAlquiler2.addEventListener("click", cargainicialModAlquiler, false);

var oBtnModAlquiler3 = $('#frmModAlquilerSeleccionado #filtrar')[0];
oBtnModAlquiler3.addEventListener("click", function(){cargarMaquinasDisponiblesParaAlquilar("frmModAlquilerSeleccionado")}, false);

var oBtnModAlquiler4 = $('#frmModAlquilerSeleccionado button[name="anadirMaquina"]')[0];
oBtnModAlquiler4.addEventListener("click", pasarMaquinaMod, false);

var oBtnModAlquiler5 = $('#frmModAlquilerSeleccionado button[name="quitarMaquina"]')[0];
oBtnModAlquiler5.addEventListener("click", quitarMaquinaMod, false);

$('#frmModAlquilerSeleccionado .comboCliente').keyup(function(){cargarComboClientes("frmModAlquilerSeleccionado")});
$('#frmModAlquilerSeleccionado .comboEmpleado').keyup(function(){cargarComboEmpleados("frmModAlquilerSeleccionado")});

cargainicialModAlquiler();

function cargainicialModAlquiler(){

	$(document).ready(function(){	
		$("#frmModAlquilerSeleccionado #txtFechaIniAlquiler" ).datepicker({ dateFormat: 'dd/mm/yy'});
		$("#frmModAlquilerSeleccionado #txtFechaIniAlquiler").on("change", function() {recalcularImporte()});
		$("#frmModAlquilerSeleccionado #txtFechaFinAlquiler" ).datepicker({ dateFormat: 'dd/mm/yy' });
		$("#frmModAlquilerSeleccionado #txtFechaFinAlquiler").on("change", function() {recalcularImporte()});
	});
}


function cargarAlquiler(){
var idAlquiler = $('#frmModAlquiler .comboAlquileres').val();

//Preparamos el id de alquiler
  var idAlquilerFiltrado ="";
      for(i=0; i<idAlquiler.length; i++){
        if(idAlquiler.charAt(i)!="/")
          idAlquilerFiltrado+=idAlquiler.charAt(i)
        else
          break;
      }
 
  var sParametroGET = encodeURI("buscar=" + idAlquilerFiltrado);
  var sURL = encodeURI("formularios/frmAlquiler/php/getDevolverAlquiler.php?");
  llamadaAjaxGetCargarAlquiler(sURL,sParametroGET);

}

function llamadaAjaxGetCargarAlquiler(sURL,sParametroGET){
  oAjaxGetAlquiler = objetoXHR();
  
  oAjaxGetAlquiler.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetAlquiler.onreadystatechange = respuestaGetCargarAlquiler;

  oAjaxGetAlquiler.send(null);
}

function respuestaGetCargarAlquiler(){
  if(oAjaxGetAlquiler.readyState == 4 && oAjaxGetAlquiler.status == 200) {

    var oAlquiler = JSON.parse(oAjaxGetAlquiler.responseText);
    if(oAlquiler!=0){
        $("#frmModAlquilerSeleccionado #txtIDAlquiler").val(oAlquiler.idAlquiler);
        $('#frmModAlquilerSeleccionado').find('#txtFechaIniAlquiler').datepicker("setDate", new Date(oAlquiler.fechaInicio) );
        $('#frmModAlquilerSeleccionado').find('#txtFechaFinAlquiler').datepicker("setDate", new Date(oAlquiler.fechaFinal) );
        $("#frmModAlquilerSeleccionado #txtImporteAlquiler").val(oAlquiler.importe);
        $("#frmModAlquilerSeleccionado .comboCliente").val(oAlquiler.dniCliente +" - " + oAlquiler.nombreCliente +" "+oAlquiler.apellidoCliente);
        $("#frmModAlquilerSeleccionado .comboEmpleado").val(oAlquiler.dniEmpleado +" - " + oAlquiler.nombreEmpleado +" "+oAlquiler.apellidoEmpleado);
        
        if(parseInt(oAlquiler.estado)==1){
         document.frmModAlquilerSeleccionado.estadoAlquiler.checked = true;
        }
        else
          $("#frmModAlquilerSeleccionado #estadoAlquiler").attr('checked', false);

        if( $("#frmModAlquilerSeleccionado").css('display') == 'none')
          $("#frmModAlquilerSeleccionado").slideDown();
      	cargarMaquinasDisponiblesParaAlquilar("frmModAlquilerSeleccionado");
      	cargarMaquinasAlquiler(oAlquiler.idAlquiler);
    }
    else{
      sMensaje = "Ese Alquiler no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      // resetFormularioModAlquiler();
    }
  }
}

// /*************************AJAX CARGA MAQUINAS Alquiler*************************/

function cargarMaquinasAlquiler(idAlquiler){
	sMensaje = "Cargando Maquinas relacionadas.";
 	mostrarMensaje(sMensaje, false);

	sDatos="buscar="+idAlquiler+"&estado=1";

	$.get( "formularios/frmAlquiler/php/getDevolverMaquinasAlquiler.php", sDatos ,respuestaGetCargarMaquinasAlquiler);

}

function respuestaGetCargarMaquinasAlquiler(oDatosDevueltos, sStatus, oAjax) {
	if(oDatosDevueltos!=null)
		$("#frmModAlquilerSeleccionado #maquinasSeleccionadas").html(oDatosDevueltos);
	else{
		sMensaje = "No hay máquinas relacionadas con el alquiler";
      	mostrarMensaje(sMensaje, false);
	}

}


/**************************************Formulario interno*********************************/
function pasarMaquinaMod(){
	$("#frmModAlquilerSeleccionado #maquinasDisponibles option").each(function(indice,option){
		//var yaPasado=false;
		if(option.selected){
			// $("#maquinasSeleccionadas option").each(function(indice2,option2){
			// 	if(option.value==option2.value)
			// 		yaPasado=true;
			// });
			// if(!yaPasado){
				$("#frmModAlquilerSeleccionado #maquinasSeleccionadas").prepend($(option).clone());
			// }
		}
	});
	recalcularImporteMod();
}

function quitarMaquinaMod(){
	$("#frmModAlquilerSeleccionado #maquinasSeleccionadas option").each(function(indice,option){
		if(option.selected)
			$(option).remove();
	});
	recalcularImporteMod();
}


function recalcularImporteMod(){
	var importeTotal=0;
	var fechaInicio = $('#frmModAlquilerSeleccionado #txtFechaIniAlquiler').datepicker("getDate");
	var fechaFin = $('#frmModAlquilerSeleccionado #txtFechaFinAlquiler').datepicker("getDate");

	if(fechaInicio!=null && fechaFin!=null){
		fechaInicio = fechaInicio.getTime();
		fechaFin = fechaFin.getTime();

		$("#frmModAlquilerSeleccionado #maquinasSeleccionadas option").each(function(indice,option){
			importeTotal+=parseInt(option.dataset.precio);
			//alert(importeTotal);
		});

		var msecPerMinute = 1000 * 60;
		var msecPerHour = msecPerMinute * 60;
		var msecPerDay = msecPerHour * 24;


		var interval = fechaFin-fechaInicio;

		var numDias = Math.floor(interval / msecPerDay );
		if (numDias == 0)
		    numDias=1;
		var importeTotal = importeTotal * numDias;

		$('#frmModAlquilerSeleccionado #txtImporteAlquiler').val(importeTotal);
	}
}


function actualizarAlquiler(){
	//console.log(document.frmModAlquilerSeleccionado);
	var formulario = document.frmModAlquilerSeleccionado;
	if(validarAlquiler(formulario)){

		var idAlquiler = formulario.txtIDAlquiler.value.trim();
		var fechaAlquiler = $('#frmModAlquilerSeleccionado #txtFechaIniAlquiler').datepicker("getDate");
		var fechaAlquilerFin = $('#frmModAlquilerSeleccionado #txtFechaFinAlquiler').datepicker("getDate");
		var importeAlquiler = parseFloat(formulario.txtImporteAlquiler.value.trim());
		var dniCliente = formulario.cliente.value.substring(0,9);
		var dniEmpleado = formulario.empleado.value.substring(0,9);
		var arrayMaquinas = new Array();
		var estado = $("#frmModAlquilerSeleccionado #estadoAlquiler").is(":checked");
		$("#frmModAlquilerSeleccionado #maquinasSeleccionadas option").each(function(indice,option){
			arrayMaquinas.push(option.value);
		});

		var oAlquiler = new Alquiler(idAlquiler,fechaAlquiler, fechaAlquilerFin, importeAlquiler, dniCliente, arrayMaquinas, dniEmpleado) ;

		if(estado)
       		oAlquiler.estado = 1;
      	else
      		oAlquiler.estado = 0;

		var sDatos = "datos=" + JSON.stringify(oAlquiler);

		var insertar=false;

		$.ajax({
		  type: "POST",
		  url: "formularios/frmAlquiler/php/actualizarAlquiler.php",
		  async: true,
		  data: sDatos,
		  success: respuestaActualizarAlquiler	
		});
	}
}

function respuestaActualizarAlquiler(oDatosDevueltos, sStatus, oAjax){
	 if (oDatosDevueltos[0] == false) {
		        // Mensaje
		sMensaje = "Alquiler actualizado con éxito";
		mostrarMensaje(sMensaje, true);
		$('#frmModAlquilerSeleccionado')[0].reset();
		$('#frmModAlquilerSeleccionado #maquinasSeleccionadas').find('option').remove();
		$("#frmModAlquilerSeleccionado").slideUp();
	 } 
	 else{
		sMensaje = oDatosDevueltos[1];
		mostrarMensaje(sMensaje, false);
	 }

}

// /*************************AJAX CARGA MAQUINAS*************************/



  

