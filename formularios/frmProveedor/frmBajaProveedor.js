$('#frmBajaProveedor .comboProveedor').keypress(function(){cargarComboProveedores('frmBajaProveedor')});
$('#frmBajaProveedor input[name="verProveedor"]').click(cargarProvBaja);
$('#frmBajaProveedorSeleccionado #btnBajaProveedorCancelar').click(resetFormularioBajaProv);
$('#frmBajaProveedorSeleccionado #btnBajaProveedor').click(llamadaAjaxActualizarProvBaja);

function cargarProvBaja()
{
  var strProv=$('#frmBajaProveedor .comboProveedor').val();
  var strDniProv = strProv.substring(0, 9);
  var sParametroGET = encodeURI("buscar=" + strDniProv);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmProveedor/php/getDevolverProveedor.php?");

  llamadaAjaxGetProveedor(sURL,sParametroGET);
}

function llamadaAjaxGetProveedor(sURL,sParametroGET)
{
  oAjaxGetProvs = objetoXHR();
  
  oAjaxGetProvs.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetProvs.onreadystatechange = respuestaGetProveedor;

  oAjaxGetProvs.send(null);
}

function respuestaGetProveedor()
{
  if(oAjaxGetProvs.readyState == 4 && oAjaxGetProvs.status ==200) 
  {
    var oProv = JSON.parse(oAjaxGetProvs.responseText);
    if(oProv!=null)
    {
        $("#frmBajaProveedorSeleccionado #txtDNIProveedor").val(oProv.dniProv);
        $("#frmBajaProveedorSeleccionado #txtNombreProveedor").val(oProv.nombreProv);
        $("#frmBajaProveedorSeleccionado #txtApellidoProveedor").val(oProv.apellidoProv);
        $("#frmBajaProveedorSeleccionado #txtEmpresaProveedor").val(oProv.empresaProv);

        if( $("#frmBajaProveedorSeleccionado").css('display') == 'none')
          $("#frmBajaProveedorSeleccionado").slideDown();
    }
    else
    {
      sMensaje = "Ese Proveedor no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      resetFormularioBajaProv();
    }
  }
}

function resetFormularioBajaProv()
{
    $("#frmBajaProveedorSeleccionado").slideUp();
    $("#frmBajaProveedorSeleccionado")[0].reset();
}

function llamadaAjaxActualizarProvBaja()
{
    var dniProv = $("#frmBajaProveedorSeleccionado #txtDNIProveedor").val();
    var estado = 1;

    var oDatos =  { dni: dniProv, estado: estado}
    
    // Formateo de parametro POST
    var sParametroPOST = "datos=" + JSON.stringify(oDatos);

    // Codifico para envio
    sParametroPOST = encodeURI(sParametroPOST);

    // Script de envio
    var sURL = encodeURI("formularios/frmProveedor/php/bajaProveedor.php");

    //Llamada AJAX
    llamadaAjaxBajaProv(sURL,sParametroPOST);
}

function llamadaAjaxBajaProv(sURL,sParametroPOST)
{
  oAjaxBajaProv = objetoXHR();
  
  oAjaxBajaProv.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxBajaProv.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  oAjaxBajaProv.addEventListener("readystatechange",respuestaBajaProveedor,false);

  oAjaxBajaProv.send(sParametroPOST);
}

function respuestaBajaProveedor()
{
  if(oAjaxBajaProv.readyState == 4 && oAjaxBajaProv.status ==200) 
  {
    var oArrayRespuesta = JSON.parse(oAjaxBajaProv.responseText);
    
    if (oArrayRespuesta[0] == false)
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioBajaProv();
    } 
    else 
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}