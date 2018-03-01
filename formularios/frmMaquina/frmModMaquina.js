$('#frmModMaquina .comboMaquina').keyup(function(){cargarMaquinasDisponiblesMod('frmModMaquina')});
$('#frmModMaquinaSeleccionada #proveedor').keyup(function(){cargarComboProveedores("frmModMaquinaSeleccionada")});
$('#frmModMaquina input[name="verMaquina"]').click(cargarFormularioModificacion);
//$('#frmModMaquinaSeleccionada #btnModificarEmpleadoCancelar').click(resetFormularioModEmpleado);
$('#frmModMaquinaSeleccionada #btnModificarMaquina').click(llamadaAjaxActualizarMaqMod);
$('#frmModMaquinaSeleccionada #fechaCompra').datepicker({ dateFormat: 'dd/mm/yy'});


function cargarFormularioModificacion()
{
  var str = $('#frmModMaquina .comboMaquina').val();
  var strMaq=str.substr(0,str.indexOf(' '));
  var sParametroGET = encodeURI("buscar=" + strMaq);
  
  // Script de envio
  var sURL = encodeURI("formularios/frmMaquina/php/getDevolverMaquina.php?");

  llamadaAjaxGetMaquinaMod(sURL,sParametroGET);
}

function llamadaAjaxGetMaquinaMod(sURL,sParametroGET)
{
  oAjaxGetMaq = objetoXHR();
  
  oAjaxGetMaq.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetMaq.onreadystatechange = respuestaGetMaqMod;

  oAjaxGetMaq.send(null);
}

function respuestaGetMaqMod()
{
  if(oAjaxGetMaq.readyState == 4 && oAjaxGetMaq.status ==200) 
  {
    var oMaq = JSON.parse(oAjaxGetMaq.responseText);
    if(oMaq!=null)
    {
        $("#frmModMaquinaSeleccionada #txtIDMaquina").val(oMaq.idMaquina);
        $("#frmModMaquinaSeleccionada #txtNombreMaquina").val(oMaq.nombreMaquina);
        $("#frmModMaquinaSeleccionada #txtModeloMaquina").val(oMaq.modelo);
        $("#frmModMaquinaSeleccionada #txtDecMaquina").val(oMaq.descMaquina);
        $("#frmModMaquinaSeleccionada #txtPrecioMaquina").val(oMaq.precioAlquiler);
        $("#frmModMaquinaSeleccionada #fechaCompra").datepicker("setDate", new Date(oMaq.fechaCompra));
        $("#frmModMaquinaSeleccionada #precioCompra").val(oMaq.importeCompra);
        $("#frmModMaquinaSeleccionada .comboProveedor").val(oMaq.proveedor +" - " + oMaq.nombreProv +" "+oMaq.apellidoProv);


		if(parseInt(oMaq.estado)==1)
		{
         document.frmModMaquinaSeleccionada.estadoMaquinaria.checked = true;
    }
    else
        document.frmModMaquinaSeleccionada.estadoMaquinaria.checked = false;

        // if(parseInt(oMaq.estado)==1) 
        //   $("#estadoMaq").attr('checked', true);
        // else
        //   $("#estadoMaq").attr('checked', false);

    if( $("#frmModMaquinaSeleccionada").css('display') == 'none')
          $("#frmModMaquinaSeleccionada").slideDown();
    }
    else
    {
      sMensaje = "Esta maquina no se encuentra registrada";
      mostrarMensaje(sMensaje, false);
      resetFormularioModMaquina();
    }
  }
}

function resetFormularioModMaquina()
{
    $("#frmModMaquinaSeleccionada").slideUp();
    $("#frmModMaquinaSeleccionada")[0].reset();
}

function llamadaAjaxActualizarMaqMod()
{      
  var formulario = document.frmModMaquinaSeleccionada;
  if(validarMaquina(formulario)){
    	var modelo=$("#frmModMaquinaSeleccionada #txtModeloMaquina").val();
    	var idMaquina=$("#frmModMaquinaSeleccionada #txtIDMaquina").val();
      var nombreMaquin=$("#frmModMaquinaSeleccionada #txtNombreMaquina").val();
      var descMaquina= $("#frmModMaquinaSeleccionada #txtDecMaquina").val();
      var precioAlquiler= parseFloat($("#frmModMaquinaSeleccionada #txtPrecioMaquina").val());
      var fechaCompra=$('#frmModMaquinaSeleccionada #fechaCompra').datepicker("getDate");
      var importeCompra=parseFloat($("#frmModMaquinaSeleccionada #precioCompra").val());
      var proveedor=$("#frmModMaquinaSeleccionada .comboProveedor").val().substring(0,9);
           
      var estado=$("#frmModMaquinaSeleccionada #estadoMaquinaria").is(":checked");

      var oMaq = new Maquina(modelo, idMaquina, nombreMaquin, descMaquina, precioAlquiler, fechaCompra, importeCompra, proveedor);
      
      if(estado)
         oMaq.estado = 1;
        else
         oMaq.estado = 0;

      // Formateo de parametro POST
      var sParametroPOST = "datos=" + JSON.stringify(oMaq);

      // Codifico para envio
      sParametroPOST = encodeURI(sParametroPOST);

      // Script de envio
      var sURL = encodeURI("formularios/frmMaquina/php/modMaquina.php");

      //Llamada AJAX
      llamadaAjaxModMaquina(sURL,sParametroPOST);
  }
}

function llamadaAjaxModMaquina(sURL,sParametroPOST)
{
  oAjaxModMaq = objetoXHR();
  
  oAjaxModMaq.open("POST",sURL,true);
  
  // Para peticiones con metodo POST        
  oAjaxModMaq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  oAjaxModMaq.addEventListener("readystatechange",respuestaModMaq,false);

  oAjaxModMaq.send(sParametroPOST);
}

function respuestaModMaq()
{
  if(oAjaxModMaq.readyState == 4 && oAjaxModMaq.status ==200) 
  {
    var oArrayRespuesta = JSON.parse(oAjaxModMaq.responseText);
    
    if (oArrayRespuesta[0] == false)
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, true);
      $('#frmModMaquinaSeleccionada')[0].reset();
      $('#frmModMaquinaSeleccionada').slideUp();
    } 
    else 
    {
      sMensaje = oArrayRespuesta[1];
      mostrarMensaje(sMensaje, false);
    }
  }
}