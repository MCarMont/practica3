$('#frmModEmpleado .comboEmpleado').keyup(function(){cargarComboEmpleados('frmModEmpleado')});
$('#frmModEmpleado input[name="verEmpleado"]').click(cargarFormularioModificacion);
$('#frmModEmpleadoSeleccionado #btnModificarEmpleadoCancelar').click(resetFormularioModEmpleado);
$('#frmModEmpleadoSeleccionado #btnModificarEmpleado').click(llamadaAjaxActualizarEmpleado);

cargarComboLocalidades();

function cargarFormularioModificacion(){

  var strEmpleado=$('#frmModEmpleado .comboEmpleado').val();
  var strDniEmpleado = strEmpleado.substring(0, 9);
  var sParametroGET = encodeURI("buscar=" + strDniEmpleado);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmEmpleado/php/getDevolverEmpleado.php?");

  llamadaAjaxGetEmpleado(sURL,sParametroGET);
}

function llamadaAjaxGetEmpleado(sURL,sParametroGET){

  oAjaxGetEmpleados = objetoXHR();
  
  oAjaxGetEmpleados.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetEmpleados.onreadystatechange = respuestaGetEmpleado;

  oAjaxGetEmpleados.send(null);
}

function respuestaGetEmpleado(){
  if(oAjaxGetEmpleados.readyState == 4 && oAjaxGetEmpleados.status ==200) {

    var oEmpleado = JSON.parse(oAjaxGetEmpleados.responseText);
    if(oEmpleado!=null){
        $("#frmModEmpleadoSeleccionado #txtDNIEmpleado").val(oEmpleado.dniEmpleado);
        $("#frmModEmpleadoSeleccionado #txtNombreEmpleado").val(oEmpleado.nombreEmpleado);
        $("#frmModEmpleadoSeleccionado #txtApellidoEmpleado").val(oEmpleado.apellidoEmpleado);
        $("#frmModEmpleadoSeleccionado #txtTelefonoEmpleado").val(oEmpleado.telEmpleado);
        $("#frmModEmpleadoSeleccionado #txtDireccionEmpleado").val(oEmpleado.dirEmpleado);
        $("#frmModEmpleadoSeleccionado #cmbLoc2").val(oEmpleado.localidadEmpleado).attr('selected','selected');
        $("#frmModEmpleadoSeleccionado #txtCPostalEmpleado").val(oEmpleado.cpEmpleado);
        
        if(parseInt(oEmpleado.estado)==1) 
          $("#estadoEmpleado").attr('checked', true);
        else
          $("#estadoEmpleado").attr('checked', false);

        if( $("#frmModEmpleadoSeleccionado").css('display') == 'none')
          $("#frmModEmpleadoSeleccionado").slideDown();
    }
    else{
      sMensaje = "Ese Empleado no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      resetFormularioModEmpleado();
    }
  }
}
function resetFormularioModEmpleado()
{
    $("#frmModEmpleadoSeleccionado").slideUp();
    $("#frmModEmpleadoSeleccionado")[0].reset();
}

function llamadaAjaxActualizarEmpleado()
{
  var formulario = document.frmModEmpleadoSeleccionado;
  if(validarEmpleados(formulario))
   {
     var dniEmpleado = $("#frmModEmpleadoSeleccionado #txtDNIEmpleado").val();
     var nombreEmpleado = $("#frmModEmpleadoSeleccionado #txtNombreEmpleado").val();
     var apellidoEmpleado = $("#frmModEmpleadoSeleccionado #txtApellidoEmpleado").val();
     var telEmpleado = $("#frmModEmpleadoSeleccionado #txtTelefonoEmpleado").val();
     var dirEmpleado = $("#frmModEmpleadoSeleccionado #txtDireccionEmpleado").val();
     var localidadEmpleado =  $("#cmbLoc2").val();
     var cpEmpleado = $("#frmModEmpleadoSeleccionado #txtCPostalEmpleado").val();

      var estado = $("#frmModEmpleadoSeleccionado #estadoEmpleado").is(":checked");

       //Creo un objeto Empleado
      var oProp = new Empleado( dniEmpleado, nombreEmpleado, apellidoEmpleado, telEmpleado, dirEmpleado, localidadEmpleado, cpEmpleado);
      if(estado)
       oProp.estado = 1;
      else
       oProp.estado = 0;
      // Formateo de parametro POST
      var sParametroPOST = "datos=" + JSON.stringify(oProp);

      // Codifico para envio
      sParametroPOST = encodeURI(sParametroPOST);

      // Script de envio
      var sURL = encodeURI("formularios/frmEmpleado/php/actualizarEmpleado.php");

      //Llamada AJAX
      llamadaAjaxAltaEmpleado(sURL,sParametroPOST);
    } 
}

function llamadaAjaxAltaEmpleado(sURL,sParametroPOST){

  oAjaxActualizaCli = objetoXHR();
  
  oAjaxActualizaCli.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxActualizaCli.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  //oAjaxActualizaCli.onreadystatechange = respuestaAltaEmpleado;
  oAjaxActualizaCli.addEventListener("readystatechange",respuestaActualizaEmpleado,false);

  oAjaxActualizaCli.send(sParametroPOST);
}


function respuestaActualizaEmpleado(){

  if(oAjaxActualizaCli.readyState == 4 && oAjaxActualizaCli.status ==200) {

    var oArrayRespuesta = JSON.parse(oAjaxActualizaCli.responseText);
    
    if (oArrayRespuesta[0] == false){
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioModEmpleado();
    } else {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}