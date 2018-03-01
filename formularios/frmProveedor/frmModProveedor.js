//# sourceURL=formularios/frmProveedor/frmModProveedor.js
 
$('#frmModProveedor .comboProveedor').keypress(function(){cargarComboProveedores('frmModProveedor')});
$('#frmModProveedor input[name="verProveedor"]').click(cargarFormularioModificacion);
$('#frmModProveedorSeleccionado #btnModificarProveedorCancelar').click(resetFormularioModProveedor);
$('#frmModProveedorSeleccionado #btnModificarProveedor').click(llamadaAjaxActualizarProveedor);


function cargarFormularioModificacion(){

  var strProveedor=$('#frmModProveedor .comboProveedor').val();
  var strDniProveedor = strProveedor.substring(0, 9);
  var sParametroGET = encodeURI("buscar=" + strDniProveedor);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmProveedor/php/getDevolverProveedor.php?");

  llamadaAjaxGetProveedor(sURL,sParametroGET);

}

function llamadaAjaxGetProveedor(sURL,sParametroGET){

  oAjaxGetProveedors = objetoXHR();
  
  oAjaxGetProveedors.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetProveedors.onreadystatechange = respuestaGetProveedor;

  oAjaxGetProveedors.send(null);
}

function respuestaGetProveedor(){
  if(oAjaxGetProveedors.readyState == 4 && oAjaxGetProveedors.status ==200) {

    var oProveedor = JSON.parse(oAjaxGetProveedors.responseText);
    if(oProveedor!=null){
        $("#frmModProveedorSeleccionado #txtDNIProveedor").val(oProveedor.dniProv);
        $("#frmModProveedorSeleccionado #txtNombreProveedor").val(oProveedor.nombreProv);
        $("#frmModProveedorSeleccionado #txtApellidoProveedor").val(oProveedor.apellidoProv);
        $("#frmModProveedorSeleccionado #txtEmpresaProveedor").val(oProveedor.empresaProv);
        $("#frmModProveedorSeleccionado #txtTelefonoProveedor").val(oProveedor.telefonoProv);
        $("#frmModProveedorSeleccionado #txtDireccionProveedor").val(oProveedor.direccionProv);
        $("#frmModProveedorSeleccionado #txtLocalidadProveedor").val(oProveedor.localidadProv);
        $("#frmModProveedorSeleccionado #txtCPostalProveedor").val(oProveedor.cPostalProv);
        
        if(parseInt(oProveedor.estado)==1) 
          $("#estadoProveedor").attr('checked', true);
        else
          $("#estadoProveedor").attr('checked', false);
        
        if( $("#frmModProveedorSeleccionado").css('display') == 'none')
          $("#frmModProveedorSeleccionado").slideDown();
    }
    else{
      sMensaje = "Ese Proveedor no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      resetFormularioModProveedor();
    }
  }
}
function resetFormularioModProveedor(){
    $("#frmModProveedorSeleccionado").slideUp();
    $("#frmModProveedorSeleccionado")[0].reset();
}


function llamadaAjaxActualizarProveedor(){

  var formulario = document.frmModProveedorSeleccionado;
  if(validarProveedor(formulario))
   {


     var dniProveedor = $("#frmModProveedorSeleccionado #txtDNIProveedor").val();
     var nombreProveedor = $("#frmModProveedorSeleccionado #txtNombreProveedor").val();
     var apellidoProveedor = $("#frmModProveedorSeleccionado #txtApellidoProveedor").val();
     var empresaProveedor = $("#frmModProveedorSeleccionado #txtEmpresaProveedor").val();
     var telProveedor = $("#frmModProveedorSeleccionado #txtTelefonoProveedor").val();
     var dirProveedor = $("#frmModProveedorSeleccionado #txtDireccionProveedor").val();
     var localidadProveedor = $("#frmModProveedorSeleccionado #txtLocalidadProveedor").val();
     var cpProveedor = $("#frmModProveedorSeleccionado #txtCPostalProveedor").val();

     var estado = $("#frmModProveedorSeleccionado #estadoProveedor").is(":checked");

       //Creo un objeto Proveedor
      var oProp = new Proveedor( dniProveedor, nombreProveedor, apellidoProveedor, empresaProveedor, telProveedor, dirProveedor, localidadProveedor, cpProveedor);
      if(estado)
       oProp.estado = 1;
      else
       oProp.estado = 0;
      // Formateo de parametro POST
      var sParametroPOST = "datos=" + JSON.stringify(oProp);

      // Codifico para envio
      sParametroPOST = encodeURI(sParametroPOST);

      // Script de envio
      var sURL = encodeURI("formularios/frmProveedor/php/actualizarProveedor.php");

      //Llamada AJAX
      llamadaAjaxAltaProveedor(sURL,sParametroPOST);
    } 
}

function llamadaAjaxAltaProveedor(sURL,sParametroPOST){

  oAjaxActualizaCli = objetoXHR();
  
  oAjaxActualizaCli.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxActualizaCli.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  //oAjaxActualizaCli.onreadystatechange = respuestaAltaProveedor;
  oAjaxActualizaCli.addEventListener("readystatechange",respuestaActualizaProveedor,false);

  oAjaxActualizaCli.send(sParametroPOST);
}


function respuestaActualizaProveedor(){

  if(oAjaxActualizaCli.readyState == 4 && oAjaxActualizaCli.status ==200) {

    var oArrayRespuesta = JSON.parse(oAjaxActualizaCli.responseText);
    
    if (oArrayRespuesta[0] == false){
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioModProveedor();
    } else {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}