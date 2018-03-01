//EMPLEADOS
$("#menuEmpleadoAlta").click(function(){cargaFormulario("#frmAltaEmpleado","frmEmpleado/frmAltaEmpleado.html","frmEmpleado/frmAltaEmpleado.js")});
$("#menuEmpleadoBaja").click(function(){cargaFormulario("#frmBajaEmpleado","frmEmpleado/frmBajaEmpleado.html","frmEmpleado/frmBajaEmpleado.js")});
$("#menuEmpleadoMod").click(function(){cargaFormulario("#frmModEmpleado","frmEmpleado/frmModEmpleado.html","frmEmpleado/frmModEmpleado.js")});
$("#menuEmpleadoList").click(function(){cargaFormulario("#frmListEmpleado","frmEmpleado/frmListEmpleado.html","frmEmpleado/frmListEmpleado.js")});

//PROVEEDORES
$("#menuAltaProv").click(function(){cargaFormulario("#frmAltaProveedor","frmProveedor/frmAltaProveedor.html","frmProveedor/frmAltaProveedor.js")});
$("#menuBajaProv").click(function(){cargaFormulario("#frmBajaProveedor","frmProveedor/frmBajaProveedor.html","frmProveedor/frmBajaProveedor.js")});
$("#menuModProv").click(function(){cargaFormulario("#frmModProveedor","frmProveedor/frmModProveedor.html","frmProveedor/frmModProveedor.js")});
$("#menuListProv").click(function(){cargaFormulario("#frmListarProveedor","frmProveedor/frmListarProveedor.html","frmProveedor/frmListProveedor.js")});

//CLIENTES
$("#menuAltaCliente").click(function(){cargaFormulario("#frmAltaCliente","frmCliente/frmAltaCliente.html","frmCliente/frmAltaCliente.js")});
$("#menuBajaCliente").click(function(){cargaFormulario("#frmBajaCliente","frmCliente/frmBajaCliente.html","frmCliente/frmBajaCliente.js")});
$("#menuModCliente").click(function(){cargaFormulario("#frmModCliente","frmCliente/frmModCliente.html","frmCliente/frmModCliente.js")});
$("#menuListCliente").click(function(){cargaFormulario("#frmListCliente","frmCliente/frmListCliente.html","frmCliente/frmListCliente.js")});

//MAQUINARIA
$("#menuAltaMaq").click(function(){cargaFormulario("#frmAltaMaquina","frmMaquina/frmAltaMaquina.html","frmMaquina/frmAltaMaquina.js")});
$("#menuBajaMaq").click(function(){cargaFormulario("#frmBajaMaquina","frmMaquina/frmBajaMaquina.html","frmMaquina/frmBajaMaquina.js")});
$("#menuModMaq").click(function(){cargaFormulario("#frmModMaquina","frmMaquina/frmModMaquina.html","frmMaquina/frmModMaquina.js")});
$("#menuListMaq").click(function(){cargaFormulario("#frmListarMaquina","frmMaquina/frmListarMaquina.html","frmMaquina/frmListarMaquina.js")});

//ALQUILER
$("#menuAlquileres a[name='Alta']").click(function(){cargaFormulario("#frmAltaAlquiler","frmAlquiler/frmAltaAlquiler.html","frmAlquiler/frmAltaAlquiler.js")});
$("#menuAlquileres a[name='Modificar']").click(function(){cargaFormulario("#frmModAlquiler","frmAlquiler/frmModAlquiler.html","frmAlquiler/frmModAlquiler.js")});
$("#menuAlquileres a[name='Listar']").click(function(){cargaFormulario("#frmListarAlquiler","frmAlquiler/frmListAlquiler.html","frmAlquiler/frmListAlquiler.js")});

//DEVOLUCIONES
$("#menuAltaDevolucion").click(function(){cargaFormulario("#frmAltaDevoluciones","frmDevoluciones/frmAltaDevoluciones.html","frmDevoluciones/frmAltaDevoluciones.js")});
$("#menuListarDevolucion").click(function(){cargaFormulario("#frmListarDev","frmDevoluciones/frmListarDevoluciones.html","frmDevoluciones/frmListarDevoluciones.js")});

function cargaFormulario(sForm, sRuta, sScript) 
{
    // Oculto todos los formularios menos este
    $("form:not('"+sForm+"')").hide("normal");

    // Verifico si ya he cargado el formulario antes
    if ($(""+sForm+"").size() == 0) {
        $("<div>").appendTo('#formularios').load("formularios/"+sRuta+"",
            function() {
                $.getScript("formularios/"+sScript+"");
            });

    } else {
        // Lo muestro si está oculto
        $(sForm)[0].reset(); //Resetea el formulario antes de cargarlo
        $(sForm).find('.is-invalid').removeClass('is-invalid'); // borra las clases invalidas del formulario
        $(sForm).show("normal");
    }
}

/***********************Carga combo prov*****************************/

function cargarComboProveedores(FORMULARIO)
{
  var cad='#'+FORMULARIO+' .comboProveedor';

  var sParametroGET = encodeURI("buscar=" + $(cad).val());
  
  // Script de envio
  var sURL = encodeURI("formularios/frmProveedor/php/getComboProveedor.php?");

  if($(cad)[0].value.length>1 && $(cad)[0].value.length<6)
    llamadaAjaxGetProveedors(sURL,sParametroGET,$(cad));

}

function llamadaAjaxGetProveedors(sURL,sParametroGET,COMBO){

  oAjaxGetProveedors = objetoXHR();
  
  oAjaxGetProveedors.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetProveedors.onreadystatechange = function(){respuestaGetProveedors(COMBO)};

  oAjaxGetProveedors.send(null);
}

function respuestaGetProveedors(COMBO){
  if(oAjaxGetProveedors.readyState == 4 && oAjaxGetProveedors.status ==200) {

    var oArrayProveedors = JSON.parse(oAjaxGetProveedors.responseText);
    var availableTags = [];
    for (var i=0;i<oArrayProveedors.length;i++){
      var cadena =  oArrayProveedors[i].dniProv + " - " +
                    oArrayProveedors[i].nombreProv + "  " + 
                    oArrayProveedors[i].apellidoProv;
                    oArrayProveedors[i].empresaProv;
      availableTags.push(cadena);
    }

   // console.log(availableTags);
    COMBO.autocomplete({
     source: availableTags
    });
    
  }
}



/**********************Carga los combos de cliente****************/

function cargarComboClientes(FORMULARIO){

  var cad='#'+FORMULARIO+' .comboCliente';

  var sParametroGET = encodeURI("buscar=" + $(cad).val());
  
  // Script de envio
  var sURL = encodeURI("formularios/frmCliente/php/getComboCliente.php?");


  if($(cad)[0].value.length>1 && $(cad)[0].value.length<6)
  llamadaAjaxGetClientes(sURL,sParametroGET,$(cad));

}


function llamadaAjaxGetClientes(sURL,sParametroGET,COMBO){

  oAjaxGetClientes = objetoXHR();
  
  oAjaxGetClientes.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetClientes.onreadystatechange = function(){respuestaGetClientes(COMBO)};

  oAjaxGetClientes.send(null);
}

function respuestaGetClientes(COMBO){
  if(oAjaxGetClientes.readyState == 4 && oAjaxGetClientes.status ==200) {

    var oArrayClientes = JSON.parse(oAjaxGetClientes.responseText);
    var availableTags = [];
    for (var i=0;i<oArrayClientes.length;i++){
      var cadena = oArrayClientes[i].dniCliente + " - " + oArrayClientes[i].nombreCliente + "  " + oArrayClientes[i].apellidoCliente;
      availableTags.push(cadena);
    }
    //console.log(oArrayClientes);

   // console.log(availableTags);
    COMBO.autocomplete({
     source: availableTags
    });
    
  }
}


/**********************Carga los combos de empleado****************/

function cargarComboEmpleados(FORMULARIO){


  var cad='#'+FORMULARIO+' .comboEmpleado';

  var sParametroGET = encodeURI("buscar=" + $(cad).val());
  
  // Script de envio
  var sURL = encodeURI("formularios/frmEmpleado/php/getComboEmpleado.php?");


  if($(cad)[0].value.length>1 && $(cad)[0].value.length<6)
    llamadaAjaxGetEmpleados(sURL,sParametroGET,$(cad));

}


function llamadaAjaxGetEmpleados(sURL,sParametroGET,COMBO){

  oAjaxGetEmpleados = objetoXHR();
  
  oAjaxGetEmpleados.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetEmpleados.onreadystatechange = function(){respuestaGetEmpleados(COMBO)};

  oAjaxGetEmpleados.send(null);
}

function respuestaGetEmpleados(COMBO){
  if(oAjaxGetEmpleados.readyState == 4 && oAjaxGetEmpleados.status ==200) {

    var oArrayEmpleados = JSON.parse(oAjaxGetEmpleados.responseText);
    var availableTags = [];
    for (var i=0;i<oArrayEmpleados.length;i++){
      var cadena = oArrayEmpleados[i].dniEmpleado + " - " + oArrayEmpleados[i].nombreEmpleado + "  " + oArrayEmpleados[i].apellidoEmpleado;
      availableTags.push(cadena);
    }
    //console.log(oArrayEmpleados);

   // console.log(availableTags);
    COMBO.autocomplete({
     source: availableTags
    });
    
  }
}


/*************************CARGA LOS COMBOS DE MAQUINAS*************************/
var alFormulario ="";
function cargarMaquinasDisponiblesParaAlquilar(FORMULARIO){
  var cad='#'+FORMULARIO+' .filtrarMaquinasDisponibles';
  alFormulario=FORMULARIO;


  var filtro = $(cad).val();
  
  sDatos="buscar="+filtro+"&estado=1";

  if($(cad)[0].value.length<6)
    $.get( "formularios/frmAlquiler/php/getMaquinas.php", sDatos ,respuestaCargarMaquinas);

}

function respuestaCargarMaquinas(oDatosDevueltos, sStatus, oAjax) 
{
  var cad='#'+alFormulario+' .maquinasDisponibles';

  if(oDatosDevueltos!=null)
    $(cad).html(oDatosDevueltos);
  else{
    sMensaje = "No hay máquinas disponibles";
        mostrarMensaje(sMensaje, false);
  }
}


/*************************CARGA LOS COMBOS DE ALQUILERES*************************/
var alFormulario ="";
function cargarComboAlquileres(FORMULARIO,ESTADO){
  var cad='#'+FORMULARIO+' .comboAlquileres';
  alFormulario =FORMULARIO;
  var filtro = $(cad).val();
  //console.log(ESTADO);
  if(ESTADO=='activos')
    sDatos="buscar="+filtro+"&estado="+ESTADO;
  else
    sDatos="buscar="+filtro+"&estado=";

  $.ajax({
        url: "formularios/frmAlquiler/php/getAlquileres.php",
        async: true,
        cache: false,
        method: "GET",
        dataType: "json",
        data: sDatos,
        //  beforeSend: prepararDatosEnvio,
        complete: respuestaCargarComboAlquileres
    });

}

function respuestaCargarComboAlquileres(jqXHR, sStatus) {
  var cad='#'+alFormulario+' .comboAlquileres';

  var oArrayAlquileres = jqXHR.responseJSON;

  if (sStatus == "success") {
      var availableTags = [];
      for (var i=0;i<oArrayAlquileres.length;i++){
        var cadena = oArrayAlquileres[i].idAlquiler + " / " + oArrayAlquileres[i].dniCliente + "  " + oArrayAlquileres[i].nombreCliente;
        availableTags.push(cadena);
      }
      //console.log(oArrayAlquileres);

     // console.log(availableTags);
      $(cad).autocomplete({
       source: availableTags
      });

   } 
   else {
        alert("Error del servidor: " + sStatus);
   }
}


/********CARGAR MAQUINAS DISPONIBLES*************************/

function cargarMaquinasDisponiblesBaja(FORMULARIO){

  var cad='#'+FORMULARIO+' .comboMaquina';
  sMensaje = "Cargando Datos.";
  //mostrarMensaje(sMensaje, false);

  var sParametroGET = encodeURI("buscar=" + $(cad).val());
  
  // Script de envio
  var sURL = encodeURI("formularios/frmMaquina/php/getComboMaquinas.php?");


  if($(cad)[0].value.length>1 && $(cad)[0].value.length<6)
    llamadaAjaxGetMaquinas(sURL,sParametroGET,$(cad));

}

function llamadaAjaxGetMaquinas(sURL,sParametroGET,COMBO){

  oAjaxGetMaquinas = objetoXHR();
  
  oAjaxGetMaquinas.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetMaquinas.onreadystatechange = function(){respuestaGetMaquinas(COMBO)};

  oAjaxGetMaquinas.send(null);
}

function respuestaGetMaquinas(COMBO){
  if(oAjaxGetMaquinas.readyState == 4 && oAjaxGetMaquinas.status ==200) {

    var oArrayMaq = JSON.parse(oAjaxGetMaquinas.responseText);
    var availableTags = [];
    for (var i=0;i<oArrayMaq.length;i++){
      var cadena = oArrayMaq[i].idMaquina + " - " + oArrayMaq[i].nombreMaquina + "  " + oArrayMaq[i].modelo;
      availableTags.push(cadena);
    }

    COMBO.autocomplete({
     source: availableTags
    });
    
  }
}

/********CARGAR MAQUINAS MODIFICAR*************************/

function cargarMaquinasDisponiblesMod(FORMULARIO){

  var cad='#'+FORMULARIO+' .comboMaquina';
  sMensaje = "Cargando Datos.";
 //mostrarMensaje(sMensaje, false);

  var sParametroGET = encodeURI("buscar=" + $(cad).val() ,  );
  
  // Script de envio
  var sURL = encodeURI("formularios/frmMaquina/php/getComboMaquinasMod.php?");


  if($(cad)[0].value.length>1 && $(cad)[0].value.length<6)
    llamadaAjaxGetMaquinasMod(sURL,sParametroGET,$(cad));

}

function llamadaAjaxGetMaquinasMod(sURL,sParametroGET,COMBO){

  oAjaxGetMaquinas = objetoXHR();
  
  oAjaxGetMaquinas.open("GET",sURL+sParametroGET,true);
    
  oAjaxGetMaquinas.onreadystatechange = function(){respuestaGetMaquinasMod(COMBO)};

  oAjaxGetMaquinas.send(null);
}

function respuestaGetMaquinasMod(COMBO){
  if(oAjaxGetMaquinas.readyState == 4 && oAjaxGetMaquinas.status ==200) {

    var oArrayMaq = JSON.parse(oAjaxGetMaquinas.responseText);
    var availableTags = [];
    for (var i=0;i<oArrayMaq.length;i++){
      var cadena = oArrayMaq[i].idMaquina + " - " + oArrayMaq[i].nombreMaquina + "  " + oArrayMaq[i].modelo;
      availableTags.push(cadena);
    }

    COMBO.autocomplete({
     source: availableTags
    });
    
  }
}
//LOCALSTORAGE
function cargarComboLocalidades() 
{
    var oArrayLoc = null;

    // Existe en almacenamiento local
    if (localStorage["localides"] != null) 
    {
        oArrayLoc = JSON.parse(localStorage["localides"]);

        rellenaComboLoc(oArrayLoc);
    } 
    else 
    {
        $.get('formularios/frmEmpleado/php/getLocalidades.php', null, tratarGetLoc, 'json');
    }
}

function tratarGetLoc(oArrayLoc, sStatus, oXHR) 
{
    rellenaComboLoc(oArrayLoc);

    // Guardar en localStorage
    localStorage["ubicaciones"] = JSON.stringify(oArrayLoc);
}

function rellenaComboLoc(oArrayLoc) 
{
    $(".cmbLoc").empty();

    $.each(oArrayLoc, function(i, elemento) 
    {
        $('<option value="' + elemento.nombre + '" >' + elemento.nombre + '</option>').appendTo(".cmbLoc");
    });
}