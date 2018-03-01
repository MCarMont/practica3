var oBtnAnadirCliente = document.frmAltaCliente.btnAnadirCliente;
oBtnAnadirCliente.addEventListener("click", anadirCliente, false);

function anadirCliente() 
{	
	var formulario = document.frmAltaCliente;
	if(validarClientes(formulario))
	 {
		var dniCliente = formulario.txtDNICliente.value.trim();
		var nombreCliente = formulario.txtNombreCliente.value.trim();
		var apellidoCliente = formulario.txtApellidoCliente.value.trim();
		var telCliente = formulario.txtTelefonoCliente.value.trim();
		var dirCliente = formulario.txtDireccionCliente.value.trim();
		var localidadCliente = formulario.txtLocalidadCliente.value.trim();
		var cpCliente = formulario.txtCPostalCliente.value.trim();

		//Creo un objeto Cliente
		var oProp = new Cliente(dniCliente, nombreCliente, apellidoCliente, telCliente, dirCliente, localidadCliente, cpCliente);

		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oProp);

		// Codifico para envio
		sParametroPOST = encodeURI(sParametroPOST);

		// Script de envio
		var sURL = encodeURI("formularios/frmCliente/php/anadirCliente.php");

		//Llamada AJAX
		llamadaAjaxAltaCliente(sURL,sParametroPOST);
	} 

}


function llamadaAjaxAltaCliente(sURL,sParametroPOST){

	oAjaxAltaCli = objetoXHR();
	
	oAjaxAltaCli.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaCli.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	//oAjaxAltaCli.onreadystatechange = respuestaAltaCliente;
 	oAjaxAltaCli.addEventListener("readystatechange",respuestaAltaCliente,false);

	oAjaxAltaCli.send(sParametroPOST);
}


function respuestaAltaCliente(){

	if(oAjaxAltaCli.readyState == 4 && oAjaxAltaCli.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaCli.responseText);
		
		if (oArrayRespuesta[0] == false){
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, true);
		} else {
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, false);
		}
	}
}