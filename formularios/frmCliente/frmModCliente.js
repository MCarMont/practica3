//# sourceURL=formularios/frmCliente/frmModCliente.js
 
$('#frmModCliente .comboCliente').keyup(function(){cargarComboClientes("frmModCliente")});
$('#frmModCliente input[name="verCliente"]').click(cargarFormularioModificacion);
$('#frmModClienteSeleccionado #btnModificarClienteCancelar').click(resetFormularioModCliente);
$('#frmModClienteSeleccionado #btnModificarCliente').click(llamadaAjaxActualizarCliente);

function cargarFormularioModificacion(){

  var strCliente=$('#frmModCliente .comboCliente').val();
  var strDniCliente = strCliente.substring(0, 9);
  var sParametroGET = encodeURI("buscar=" + strDniCliente);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmCliente/php/getDevolverCliente.php?");

  llamadaAjaxGetCliente(sURL,sParametroGET);

}

function llamadaAjaxGetCliente(sURL,sParametroGET){

  oAjaxGetClientes = objetoXHR();
  
  oAjaxGetClientes.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetClientes.onreadystatechange = respuestaGetCliente;

  oAjaxGetClientes.send(null);
}

function respuestaGetCliente(){
  if(oAjaxGetClientes.readyState == 4 && oAjaxGetClientes.status ==200) {

    var oCliente = JSON.parse(oAjaxGetClientes.responseText);
    if(oCliente!=null){
        $("#frmModClienteSeleccionado #txtDNICliente").val(oCliente.dniCliente);
        $("#frmModClienteSeleccionado #txtNombreCliente").val(oCliente.nombreCliente);
        $("#frmModClienteSeleccionado #txtApellidoCliente").val(oCliente.apellidoCliente);
        $("#frmModClienteSeleccionado #txtTelefonoCliente").val(oCliente.telCliente);
        $("#frmModClienteSeleccionado #txtDireccionCliente").val(oCliente.dirCliente);
        $("#frmModClienteSeleccionado #txtLocalidadCliente").val(oCliente.localidadCliente);
        $("#frmModClienteSeleccionado #txtCPostalCliente").val(oCliente.cpCliente);

        if(parseInt(oCliente.estado)==1) 
          $("#estadoCliente").attr('checked', true);
        else
          $("#estadoCliente").attr('checked', false);

        if( $("#frmModClienteSeleccionado").css('display') == 'none')
          $("#frmModClienteSeleccionado").slideDown();
    }
    else{
      sMensaje = "Ese cliente no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      resetFormularioModCliente();
    }
  }
}

function resetFormularioModCliente(){
    $("#frmModClienteSeleccionado").slideUp();
    $("#frmModClienteSeleccionado")[0].reset();
}


function llamadaAjaxActualizarCliente(){

  var formulario = document.frmModClienteSeleccionado;
  if(validarClientes(formulario))
   {


     var dniCliente = $("#frmModClienteSeleccionado #txtDNICliente").val();
     var nombreCliente = $("#frmModClienteSeleccionado #txtNombreCliente").val();
     var apellidoCliente = $("#frmModClienteSeleccionado #txtApellidoCliente").val();
     var telCliente = $("#frmModClienteSeleccionado #txtTelefonoCliente").val();
     var dirCliente = $("#frmModClienteSeleccionado #txtDireccionCliente").val();
     var localidadCliente = $("#frmModClienteSeleccionado #txtLocalidadCliente").val();
     var cpCliente = $("#frmModClienteSeleccionado #txtCPostalCliente").val();

      var estado = $("#frmModClienteSeleccionado #estadoCliente").is(":checked");

       //Creo un objeto Cliente
      var oProp = new Cliente( dniCliente, nombreCliente, apellidoCliente, telCliente, dirCliente, localidadCliente, cpCliente);
      if(estado)
       oProp.estado = 1;
      else
       oProp.estado = 0;
      // Formateo de parametro POST
      var sParametroPOST = "datos=" + JSON.stringify(oProp);

      // Codifico para envio
      sParametroPOST = encodeURI(sParametroPOST);

      // Script de envio
      var sURL = encodeURI("formularios/frmCliente/php/actualizarCliente.php");

      //Llamada AJAX
      llamadaAjaxAltaCliente(sURL,sParametroPOST);
    } 
}

function llamadaAjaxAltaCliente(sURL,sParametroPOST){

  oAjaxActualizaCli = objetoXHR();
  
  oAjaxActualizaCli.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxActualizaCli.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  //oAjaxActualizaCli.onreadystatechange = respuestaAltaCliente;
  oAjaxActualizaCli.addEventListener("readystatechange",respuestaActualizaCliente,false);

  oAjaxActualizaCli.send(sParametroPOST);
}


function respuestaActualizaCliente(){

  if(oAjaxActualizaCli.readyState == 4 && oAjaxActualizaCli.status ==200) {

    var oArrayRespuesta = JSON.parse(oAjaxActualizaCli.responseText);
    
    if (oArrayRespuesta[0] == false){
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioModCliente();
    } else {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}