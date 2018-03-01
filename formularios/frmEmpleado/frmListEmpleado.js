var oBtnListarEmpleado2 = document.frmListarEmpleado.btnConsultarEmpleado2;
oBtnListarEmpleado2.addEventListener("click", listarEmpleado, false);

function listarEmpleado()
{
	// Instanciar objeto Ajax
	var oAjax = objetoXHR();

	//2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("formularios/frmEmpleado/php/listaEmpleados.php"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", listEmpRespuesta, false);

    //4. Hacer la llamada
    oAjax.send(null);
}

function listEmpRespuesta() 
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) 
    {
 		//var oXML = oAjax.responseXML;
        var oHTML = oAjax.responseHTML;

	    crearTabla(oHTML);
    }
}

function crearTabla(oHTML)
{
    if($("#filtro").css('display')=='none')
        $("#filtro").css('display', 'block');

    $("#listadoEmpleado").empty();

    $("#listadoEmpleado").load("formularios/frmEmpleado/php/listaEmpleados.php");
}

$('#btnFilter').click(function() 
{
    var id = $('#filter').val();

    $('tr').show();

    $.each($(".table tbody").find("tr"), function () {                              

                if ($(this).text().toLowerCase().replace(/\s+/g, '').indexOf(id.replace(/\s+/g, '').toLowerCase()) == -1)
                    $(this).hide();
                else
                    $(this).show();
    });
});

$("#estado").change(function() 
{
  var idEstado = $('#sel1').val();

    $('tr').show();

    $('tr td.estado').each(function() {

       if($(this).data("estatus")!=idEstado)
        {
            $(this).parent().hide();
        }
        if(idEstado==2)
        {       
             $('tr').show();
        }
    });
});