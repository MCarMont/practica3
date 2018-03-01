var oBtnAnadirEmpleado = document.frmAltaEmpleado.btnAnadirEmpleado;
oBtnAnadirEmpleado.addEventListener("click", anadirEmpleado, false);

cargarComboLocalidades();

// function cargarComboLocalidades() 
// {
//     var oArrayLoc = null;

//     // Existe en almacenamiento local
//     if (localStorage["localiddes"] != null) 
//     {
//         oArrayLoc = JSON.parse(localStorage["localiddes"]);

//         rellenaComboLoc(oArrayLoc);
//     } 
//     else 
//     {
//         $.get('formularios/frmEmpleado/php/getLocalidades.php', null, tratarGetLoc, 'json');
//     }
// }

// function tratarGetLoc(oArrayLoc, sStatus, oXHR) 
// {
//     rellenaComboLoc(oArrayLoc);

//     // Guardar en localStorage
//     localStorage["ubicaciones"] = JSON.stringify(oArrayLoc);
// }

// function rellenaComboLoc(oArrayLoc) 
// {
//     $("#cmbLoc").empty();

//     $.each(oArrayLoc, function(i, elemento) 
//     {
//         $('<option value="' + elemento.nombre + '" >' + elemento.nombre + '</option>').appendTo("#cmbLoc");
//     });
// }


function anadirEmpleado() 
{	
	var formulario = document.frmAltaEmpleado;
	if(validarEmpleados(formulario))
	 {
		var dniEmpleado = document.frmAltaEmpleado.txtDNIEmpleado.value.trim();
		var nombreEmpleado = document.frmAltaEmpleado.txtNombreEmpleado.value.trim();
		var apellidoEmpleado = document.frmAltaEmpleado.txtApellidoEmpleado.value.trim();
		var telEmpleado = document.frmAltaEmpleado.txtTelefonoEmpleado.value.trim();
		var dirEmpleado = document.frmAltaEmpleado.txtDireccionEmpleado.value.trim();
		var localidadEmpleado = $("#cmbLoc").val();
		var cpEmpleado = document.frmAltaEmpleado.txtCPostalEmpleado.value.trim();

		
		//Creo un objeto Empleado
		var oProp = new Empleado(dniEmpleado, nombreEmpleado, apellidoEmpleado, telEmpleado, dirEmpleado, localidadEmpleado, cpEmpleado);

		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oProp);

		// Codifico para envio
		sParametroPOST = encodeURI(sParametroPOST);

		// Script de envio
		var sURL = encodeURI("formularios/frmEmpleado/php/anadirEmpleado.php");

		//Llamada AJAX
		llamadaAjaxAltaEmpleado(sURL,sParametroPOST);
	} 

}


function llamadaAjaxAltaEmpleado(sURL,sParametroPOST){

	oAjaxAltaEmp = objetoXHR();
	
	oAjaxAltaEmp.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaEmp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	//oAjaxAltaEmp.onreadystatechange = respuestaAltaEmpleado;
 	oAjaxAltaEmp.addEventListener("readystatechange",respuestaAltaEmpleado,false);

	oAjaxAltaEmp.send(sParametroPOST);
}


function respuestaAltaEmpleado(){

	if(oAjaxAltaEmp.readyState == 4 && oAjaxAltaEmp.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaEmp.responseText);
		
		if (oArrayRespuesta[0] == false){
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, true);
		} else {
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, false);
		}
	}
}