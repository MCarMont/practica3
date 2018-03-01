var oBtnAnadirMaquina = document.frmAltaMaquina.btnAltaMaquina;
oBtnAnadirMaquina.addEventListener("click", anadirMaquina, false);

$('#frmAltaMaquina .comboProveedor').keyup(function(){cargarComboProveedores("frmAltaMaquina")});
$('#frmAltaMaquina #fechaCompra').datepicker({ dateFormat: 'dd/mm/yy'});

function anadirMaquina() 
{	
	var formulario = document.frmAltaMaquina;
	if(validarMaquina(formulario)){
		var modMaquina = formulario.txtModeloMaquina.value.trim();
		var idMaquina = formulario.txtIDMaquina.value.trim();
		var nobreMaq = formulario.txtNombreMaquina.value.trim();
		var decMaq = formulario.txtDecMaquina.value.trim();
		var precioMaq = parseFloat(formulario.txtPrecioMaquina.value.trim());
		var fechaCompra = $('#fechaCompra').datepicker("getDate");
		var precioCompra = parseFloat(formulario.precioCompra.value.trim());
		var idProv = formulario.proveedor.value.substring(0,9);

		//Creo un objeto Maquina
		//Maquina(sModelo,iIdMaquina, sNombreMaquina, sDescMaquina, iPrecioAlquiler, dFechaCompra, iCompraMaq, sProv) 
		var oMaq = new Maquina(modMaquina, idMaquina, nobreMaq, decMaq, precioMaq, fechaCompra, precioCompra, idProv);

		// Formateo de parametro POST
		var sParametroPOST = "datos=" + JSON.stringify(oMaq);

		// Codifico para envio
		sParametroPOST = encodeURI(sParametroPOST);

		// Script de envio
		var sURL = encodeURI("formularios/frmMaquina/php/altaMaquina.php");

		//Llamada AJAX
		llamadaAjaxAltaMaquina(sURL,sParametroPOST);
	}
}

function llamadaAjaxAltaMaquina(sURL,sParametroPOST){

	oAjaxAltaMaq = objetoXHR();
	
	oAjaxAltaMaq.open("POST",sURL,true);
	
	// Para peticiones con metodo POST        
    oAjaxAltaMaq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
 	oAjaxAltaMaq.addEventListener("readystatechange",respuestaAltaMaq,false);

	oAjaxAltaMaq.send(sParametroPOST);
}

function respuestaAltaMaq(){

	if(oAjaxAltaMaq.readyState == 4 && oAjaxAltaMaq.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaMaq.responseText);
		
		if (oArrayRespuesta[0] == false){
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, true);
		} else {
			sMensaje = oArrayRespuesta[1];
			mostrarMensaje(sMensaje, false);
		}
	}
}

