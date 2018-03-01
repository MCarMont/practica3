var oBtnAnadirProveedor = document.frmAltaProveedor.btnAnadirProveedor;
oBtnAnadirProveedor.addEventListener("click", anadirProveedor, false);

function anadirProveedor() 
{	
	var formulario = document.frmAltaProveedor;
	if(validarProveedor(formulario))
	 {
		var dniProveedor = document.frmAltaProveedor.txtDNIProveedor.value.trim();
		var nombreProveedor = document.frmAltaProveedor.txtNombreProveedor.value.trim();
		var apellidoProveedor = document.frmAltaProveedor.txtApellidoProveedor.value.trim();
		var empresa = formulario.txtEmpresaProveedor.value.trim();
		var telProveedor = document.frmAltaProveedor.txtTelefonoProveedor.value.trim();
		var dirProveedor = document.frmAltaProveedor.txtDireccionProveedor.value.trim();
		var localidadProveedor = document.frmAltaProveedor.txtLocalidadProveedor.value.trim();
		var cpProveedor = document.frmAltaProveedor.txtCPostalProveedor.value.trim();

		//Creo un objeto Proveedor
		var oProp = new Proveedor(dniProveedor, nombreProveedor, apellidoProveedor,empresa, telProveedor, dirProveedor, localidadProveedor, cpProveedor);

		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oProp);

		// Codifico para envio
		sParametroPOST = encodeURI(sParametroPOST);

		// Script de envio
		var sURL = encodeURI("formularios/frmProveedor/php/anadirProveedor.php");

		//Llamada AJAX
		llamadaAjaxAltaProveedor(sURL,sParametroPOST);
	} 

}


function llamadaAjaxAltaProveedor(sURL,sParametroPOST){

	oAjaxAltaEmp = objetoXHR();
	
	oAjaxAltaEmp.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaEmp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	//oAjaxAltaEmp.onreadystatechange = respuestaAltaProveedor;
 	oAjaxAltaEmp.addEventListener("readystatechange",respuestaAltaProveedor,false);

	oAjaxAltaEmp.send(sParametroPOST);
}


function respuestaAltaProveedor(){

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