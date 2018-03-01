$('#frmBajaMaquina .comboMaquina').keyup(function(){cargarMaquinasDisponiblesBaja('frmBajaMaquina')});
$('#frmBajaMaquina input[name="verMaquina"]').click(cargarMaqBaja);
$('#frmBajaMaquinaSeleccionado #btnBajaMaquinaCancelar').click(resetFormularioBajaMaquina);
$('#frmBajaMaquinaSeleccionado #btnBajaMaquina').click(llamadaAjaxActualizarMaqBaja);

function cargarMaqBaja()
{
  var str = $('#frmBajaMaquina .comboMaquina').val();
  var strMaq=str.substr(0,str.indexOf(' '));
  var sParametroGET = encodeURI("buscar=" + strMaq);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmMaquina/php/getDevolverMaquina.php?");

  llamadaAjaxGetMAquina(sURL,sParametroGET);
}

function llamadaAjaxGetMAquina(sURL,sParametroGET)
{
  oAjaxGetMaq = objetoXHR();
  
  oAjaxGetMaq.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetMaq.onreadystatechange = respuestaGetMaq;

  oAjaxGetMaq.send(null);
}

function respuestaGetMaq()
{
  if(oAjaxGetMaq.readyState == 4 && oAjaxGetMaq.status ==200) 
  {
    var oMaq = JSON.parse(oAjaxGetMaq.responseText);
    if(oMaq!=null)
    {
        $("#frmBajaMaquinaSeleccionado #idMaquina").val(oMaq.idMaquina);
        $("#frmBajaMaquinaSeleccionado #txtNombreMaquina").val(oMaq.nombreMaquina);
        $("#frmBajaMaquinaSeleccionado #txtModeloMaquina").val(oMaq.modelo);

        if(parseInt(oMaq.estado)==1) 
          $("#estadoMaq").attr('checked', true);
        else
          $("#estadoMaq").attr('checked', false);

        if( $("#frmBajaMaquinaSeleccionado").css('display') == 'none')
          $("#frmBajaMaquinaSeleccionado").slideDown();
    }
    else
    {
      sMensaje = "Esa maquina no se encuentra registrada";
      mostrarMensaje(sMensaje, false);
      resetFormularioBajaMaquina();
    }
  }
}

function resetFormularioBajaMaquina()
{
    $("#frmBajaMaquinaSeleccionado").slideUp();
    $("#frmBajaMaquinaSeleccionado")[0].reset();
}

function llamadaAjaxActualizarMaqBaja()
{
    var idMaquina = $("#frmBajaMaquinaSeleccionado #idMaquina").val();
   
    var estado = $("#frmBajaMaquinaSeleccionado #estadoMaq").is(":checked");

    var oDatos =  { idMaquina: idMaquina, estado: estado}
    
    // Formateo de parametro POST
    var sParametroPOST = "datos=" + JSON.stringify(oDatos);

    // Codifico para envio
    sParametroPOST = encodeURI(sParametroPOST);

    // Script de envio
    var sURL = encodeURI("formularios/frmMaquina/php/bajaMaquina.php");

    //Llamada AJAX
    llamadaAjaxBajaMaquina(sURL,sParametroPOST);
}

function llamadaAjaxBajaMaquina(sURL,sParametroPOST)
{
  oAjaxBajaMaq = objetoXHR();
  
  oAjaxBajaMaq.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxBajaMaq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  oAjaxBajaMaq.addEventListener("readystatechange",respuestaBajaMaq,false);

  oAjaxBajaMaq.send(sParametroPOST);
}

function respuestaBajaMaq()
{
  if(oAjaxBajaMaq.readyState == 4 && oAjaxBajaMaq.status ==200) 
  {
    var oArrayRespuesta = JSON.parse(oAjaxBajaMaq.responseText);
    
    if (oArrayRespuesta[0] == false)
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      resetFormularioBajaMaquina();
    } 
    else 
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}