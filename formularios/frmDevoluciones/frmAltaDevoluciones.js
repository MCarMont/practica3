$('#frmAltaDevoluciones .comboAlquileres').keyup(function(){cargarComboAlquileres("frmAltaDevoluciones","activos")});
$('#frmAltaDevoluciones .comboEmpleado').keyup(function(){cargarComboEmpleados('frmAltaDevoluciones')});
$('#frmAltaDevoluciones #btnAltaDevolucion').click(anadirDevolucion);
$('#fechaDevolucion').datepicker({ dateFormat: 'dd/mm/yy', minDate: new Date(), maxDate: "+1M +10D" });

function anadirDevolucion() 
{	
	var idAlquiler = $('#frmAltaDevoluciones .comboAlquileres').val();

	//Preparamos el id de alquiler
  	var idAlquilerFiltrado ="";
      for(i=0; i<idAlquiler.length; i++){
        if(idAlquiler.charAt(i)!="/")
          idAlquilerFiltrado+=idAlquiler.charAt(i)
        else
          break;
      }
 	//console.log(idAlquilerFiltrado)
	//Preparamos el id de empleado
	var empleado = $('#frmAltaDevoluciones .comboEmpleado').val().substring(0, 9);
	var fechaDevolucion = $('#fechaDevolucion').datepicker('getDate');
	var motivo = $('#frmAltaDevoluciones #motivo').val().trim();

	if(validarAlquiler()){
		//var oDatos = {idAlquiler: idAlquiler, empleado: empleado, fechaDevolucion: fechaDevolucion, motivo:motivo}
	  	var oDatos = new Devolucion( idAlquilerFiltrado, empleado, fechaDevolucion, motivo);
	  	//console.log(oDatos);

		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oDatos);

		// Codifico para envio
		sParametroPOST = encodeURI(sParametroPOST);

		// Script de envio
		var sURL = encodeURI("formularios/frmDevoluciones/php/anadirDev.php");

		//Llamada AJAX
		llamadaAjaxAltaDev(sURL,sParametroPOST);
	}
}

function llamadaAjaxAltaDev(sURL,sParametroPOST)
{
	oAjaxAltaDev = objetoXHR();
	
	oAjaxAltaDev.open("POST","formularios/frmDevoluciones/php/anadirDev.php",true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaDev.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
 	oAjaxAltaDev.addEventListener("readystatechange",respuestaAltaDev,false);

	oAjaxAltaDev.send(sParametroPOST);
}

function respuestaAltaDev()
{
	if(oAjaxAltaDev.readyState == 4 && oAjaxAltaDev.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaDev.responseText);
		
		if (oArrayRespuesta[0] == false){
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, true);
			$('#frmAltaDevoluciones')[0].reset();
		} else {
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, false);
		}
	}
}

function validarAlquiler(){
	var bAlquiler = true;
	var aError = [];  
	var jForm = $('#frmAltaDevoluciones');
	//ID
	var idAlquiler = jForm.find('.comboAlquileres').val().trim();
	var idAlquilerFiltrado ="";
      for(i=0; i<idAlquiler.length; i++){
        if(idAlquiler.charAt(i)!="/")
          idAlquilerFiltrado+=idAlquiler.charAt(i)
        else
          break;
      }

	if(oExpRegValidarIdAlquiler.test(idAlquilerFiltrado.trim()) == false)
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			jForm.find('.comboAlquileres').focus();
		}
		claseError(jForm[0], 0);
		aError.push("ID incorrecto");
	}
	else
	{
		quitarError(jForm[0], 0);
	}

	//DNI
	var dniEmpleado = jForm.find('.comboEmpleado ').val().trim().substring(0, 9);
	if(oExpRegValidarDni.test(dniEmpleado) == false)
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			jForm.find('.comboEmpleado ').focus();
		}
		claseError(jForm[0], 1);
		aError.push("DNI incorrecto");
	}
	else
	{
		quitarError(jForm[0], 1);
	}

	//FECHA
	var fechaDev = jForm.find('#fechaDevolucion').val().trim();
	if(fechaDev == "")
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			jForm.find('#fechaDevolucion').focus();
		}
		claseError(jForm[0], 2);
		aError.push("Fecha incorrecta");
	}
	else
	{
		quitarError(jForm[0], 2);
	}

	if(aError.length>0){ // Este If muestra los mensajes de error de la validación. 
						 //	Los mete en un Div y los manda a MostrarMensaje
		DeMensajesADiv(aError);
	}
	return bAlquiler;
}