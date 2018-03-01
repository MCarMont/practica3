$('#frmBajaCliente .comboCliente').keypress(cargarCombo);
$('#frmBajaCliente input[name="verCliente"]').click(cargarClienteBaja);
$('#frmBajaClienteSeleccionado #btnBajaClienteCancelar').click(resetFormularioBajaCliente);
$('#frmBajaClienteSeleccionado #btnBajaCliente').click(llamadaAjaxActualizarClienteBaja);

function cargarCombo()
{
  var sParametroGET = encodeURI("buscar=" + $('#frmBajaCliente .comboCliente').val());
  
  // Script de envio
  var sURL = encodeURI("formularios/frmCliente/php/getComboCliente.php?");

  if($('#frmBajaCliente .comboCliente')[0].value.length>1 && $('#frmBajaCliente .comboCliente')[0].value.length<6)
    llamadaAjaxGetClientes(sURL,sParametroGET);
}

function llamadaAjaxGetClientes(sURL,sParametroGET)
{
  oAjaxGetClientes = objetoXHR();
  
  oAjaxGetClientes.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetClientes.onreadystatechange = respuestaGetClientes;

  oAjaxGetClientes.send(null);
}

function respuestaGetClientes()
{
  if(oAjaxGetClientes.readyState == 4 && oAjaxGetClientes.status ==200) 
  {
    var oArrayClientes = JSON.parse(oAjaxGetClientes.responseText);
    var availableTags = [];
    for (var i=0;i<oArrayClientes.length;i++)
    {
      var cadena =  oArrayClientes[i].dniCliente + " - " +
                    oArrayClientes[i].nombreCliente + "  " + 
                    oArrayClientes[i].apellidoCliente;
      availableTags.push(cadena);
    }
    $('#frmBajaCliente .comboCliente').autocomplete(
    {
     source: availableTags
    });    
  }
}

function cargarClienteBaja()
{
  var strCliente=$('#frmBajaCliente .comboCliente').val();
  var strDniCliente = strCliente.substring(0, 9);
  var sParametroGET = encodeURI("buscar=" + strDniCliente);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmCliente/php/getDevolverCliente.php?");

  llamadaAjaxGetClienteBaja(sURL,sParametroGET);
}

function llamadaAjaxGetClienteBaja(sURL,sParametroGET)
{
  oAjaxGetClientes = objetoXHR();
  
  oAjaxGetClientes.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetClientes.onreadystatechange = respuestaGetClienteBaja;

  oAjaxGetClientes.send(null);
}

function respuestaGetClienteBaja()
{
  if(oAjaxGetClientes.readyState == 4 && oAjaxGetClientes.status ==200) 
  {
    var oCliente = JSON.parse(oAjaxGetClientes.responseText);
    if(oCliente!=null)
    {
        $("#frmBajaClienteSeleccionado #txtDNICliente").val(oCliente.dniCliente);
        $("#frmBajaClienteSeleccionado #txtNombreCliente").val(oCliente.nombreCliente);
        $("#frmBajaClienteSeleccionado #txtApellidoCliente").val(oCliente.apellidoCliente);

        if( $("#frmBajaClienteSeleccionado").css('display') == 'none')
          $("#frmBajaClienteSeleccionado").slideDown();
    }
    else
    {
      sMensaje = "Ese Cliente no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      resetFormularioBajaCliente();
    }
  }
}

function resetFormularioBajaCliente()
{
    $("#frmBajaClienteSeleccionado").slideUp();
    $("#frmBajaClienteSeleccionado")[0].reset();
}

function llamadaAjaxActualizarClienteBaja()
{
    var dniCliente = $("#frmBajaClienteSeleccionado #txtDNICliente").val();
    var estado = 1;

    var oDatos =  { dni: dniCliente, estado: estado}
    
    // Formateo de parametro POST
    var sParametroPOST = "datos=" + JSON.stringify(oDatos);

    // Codifico para envio
    sParametroPOST = encodeURI(sParametroPOST);

    // Script de envio
    var sURL = encodeURI("formularios/frmCliente/php/bajaCliente.php");

    //Llamada AJAX
    llamadaAjaxBajaCliente(sURL,sParametroPOST);
}

function llamadaAjaxBajaCliente(sURL,sParametroPOST)
{
  oAjaxBajaCli = objetoXHR();
  
  oAjaxBajaCli.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxBajaCli.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  oAjaxBajaCli.addEventListener("readystatechange",respuestaBajaCliente,false);

  oAjaxBajaCli.send(sParametroPOST);
}

function respuestaBajaCliente()
{
  if(oAjaxBajaCli.readyState == 4 && oAjaxBajaCli.status ==200) 
  {
    var oArrayRespuesta = JSON.parse(oAjaxBajaCli.responseText);
    
    if (oArrayRespuesta[0] == false)
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioBajaCliente();
    } 
    else 
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}