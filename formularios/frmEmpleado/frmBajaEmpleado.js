$('#frmBajaEmpleado .comboEmpleado').keyup(function(){cargarComboEmpleados('frmBajaEmpleado')});
$('#frmBajaEmpleado input[name="verEmpleado"]').click(cargarEmpleadoBaja);
$('#frmBajaEmpleadoSeleccionado #btnBajarEmpleadoCancelar').click(resetFormularioBajaEmpleado);
$('#frmBajaEmpleadoSeleccionado #btnBajarEmpleado').click(llamadaAjaxActualizarEmpleadoBaja);

// function cargarCombo()
// {
//   alert("bbbb");
//   var sParametroGET = encodeURI("buscar=" + $('#frmBajaEmpleado .comboEmpleado').val());
  
//   // Script de envio
//   var sURL = encodeURI("formularios/frmEmpleado/php/getComboEmpleado.php?");

//   if($('#frmBajaEmpleado .comboEmpleado')[0].value.length>1 && $('#frmBajaEmpleado .comboEmpleado')[0].value.length<6)
//     llamadaAjaxGetEmpleados(sURL,sParametroGET);
// }

// function llamadaAjaxGetEmpleados(sURL,sParametroGET)
// {
//   oAjaxGetEmpleados = objetoXHR();
  
//   oAjaxGetEmpleados.open("GET",sURL+sParametroGET,true);
    
//   oAjaxGetEmpleados.onreadystatechange = respuestaGetEmpleados;

//   oAjaxGetEmpleados.send(null);
// }

// function respuestaGetEmpleados()
// {
//   if(oAjaxGetEmpleados.readyState == 4 && oAjaxGetEmpleados.status ==200) 
//   {
//     var oArrayEmpleados = JSON.parse(oAjaxGetEmpleados.responseText);
//     var availableTags = [];
//     for (var i=0;i<oArrayEmpleados.length;i++)
//     {
//       var cadena =  oArrayEmpleados[i].dniEmpleado + " - " +
//                     oArrayEmpleados[i].nombreEmpleado + "  " + 
//                     oArrayEmpleados[i].apellidoEmpleado;
//       availableTags.push(cadena);
//     }
//     $('#frmBajaEmpleado .comboEmpleado').autocomplete(
//     {
//      source: availableTags
//     });    
//   }
// }

function cargarEmpleadoBaja()
{
  var strEmpleado=$('#frmBajaEmpleado .comboEmpleado').val();
  var strDniEmpleado = strEmpleado.substring(0, 9);
  var sParametroGET = encodeURI("buscar=" + strDniEmpleado);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmEmpleado/php/getDevolverEmpleado.php?");

  llamadaAjaxGetEmpleado(sURL,sParametroGET);
}

function llamadaAjaxGetEmpleado(sURL,sParametroGET)
{
  oAjaxGetEmpleados = objetoXHR();
  
  oAjaxGetEmpleados.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetEmpleados.onreadystatechange = respuestaGetEmpleado;

  oAjaxGetEmpleados.send(null);
}


function respuestaGetEmpleado()
{
  if(oAjaxGetEmpleados.readyState == 4 && oAjaxGetEmpleados.status ==200) 
  {
    var oEmpleado = JSON.parse(oAjaxGetEmpleados.responseText);
    if(oEmpleado!=null)
    {
        $("#frmBajaEmpleadoSeleccionado #txtDNIEmpleado").val(oEmpleado.dniEmpleado);
        $("#frmBajaEmpleadoSeleccionado #txtNombreEmpleado").val(oEmpleado.nombreEmpleado);
        $("#frmBajaEmpleadoSeleccionado #txtApellidoEmpleado").val(oEmpleado.apellidoEmpleado);
        
        if(parseInt(oEmpleado.estado)==1) 
          $("#estadoEmpleado").attr('checked', true);
        else
          $("#estadoEmpleado").attr('checked', false);

        if( $("#frmBajaEmpleadoSeleccionado").css('display') == 'none')
          $("#frmBajaEmpleadoSeleccionado").slideDown();
    }
    else
    {
      sMensaje = "Ese Empleado no se encuentra registrado";
      mostrarMensaje(sMensaje, false);
      resetFormularioBajaEmpleado();
    }
  }
}

function resetFormularioBajaEmpleado()
{
    $("#frmBajaEmpleadoSeleccionado").slideUp();
    $("#frmBajaEmpleadoSeleccionado")[0].reset();
}

function llamadaAjaxActualizarEmpleadoBaja()
{
    var dniEmpleado = $("#frmBajaEmpleadoSeleccionado #txtDNIEmpleado").val();
    var estado = $("#frmBajaEmpleadoSeleccionado #estadoEmpleado").is(":checked");

    var oDatos =  { dni: dniEmpleado, estado: estado}
    
    // Formateo de parametro POST
    var sParametroPOST = "datos=" + JSON.stringify(oDatos);

    // Codifico para envio
    sParametroPOST = encodeURI(sParametroPOST);

    // Script de envio
    var sURL = encodeURI("formularios/frmEmpleado/php/bajaEmpleado.php");

    //Llamada AJAX
    llamadaAjaxBajaEmpleado(sURL,sParametroPOST);
}

function llamadaAjaxBajaEmpleado(sURL,sParametroPOST)
{
  oAjaxBajaEmp = objetoXHR();
  
  oAjaxBajaEmp.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxBajaEmp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  oAjaxBajaEmp.addEventListener("readystatechange",respuestaBajaEmpleado,false);

  oAjaxBajaEmp.send(sParametroPOST);
}

function respuestaBajaEmpleado()
{
  if(oAjaxBajaEmp.readyState == 4 && oAjaxBajaEmp.status ==200) 
  {
    var oArrayRespuesta = JSON.parse(oAjaxBajaEmp.responseText);
    
    if (oArrayRespuesta[0] == false)
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioBajaEmpleado();
    } 
    else 
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}