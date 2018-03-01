// var oBtnListarClientes = document.frmListarCliente.btnConsultarCliente;
// oBtnListarClientes.addEventListener("click", listarCliente, false);

$("#btnConsultarAlquileres").click(function(){listarAlq()});

function listarAlq()
{
	// Instanciar objeto Ajax
	var oAjax = objetoXHR();

	//2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("formularios/frmAlquiler/php/listarAlquileres.php?"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", listAlqRespuesta, false);

    //4. Hacer la llamada
    oAjax.send(null);
}

function listAlqRespuesta() 
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) 
    {
 		//var oXML = oAjax.responseXML;ç
        var oHTML = oAjax.responseHTML;

	    crearTablaAlquileres(oHTML);
    }
}

function crearTablaAlquileres(oHTML)
{

    if($("#filtroAlq").css('display')=='none')
        $("#filtroAlq").css('display', 'block');


    // var sTabla = '<br><table class="table table-bordered table-striped table-hover">';
    // sTabla += '<thead class="thead-dark"><tr>';
    // sTabla += '<th>ID</th><th>Fecha Inicio</th><th>Fecha Final</th>';
    // sTabla += '<th>Importe</th><th>Cliente</th><th>Empleado</th><th>Estado</th></tr></thead>';
    // sTabla += '<tbody>';

    // var oAlq = oXML.getElementsByTagName("alquiler");
    // var estado="";

    // for (var i=0; i<oAlq.length; i++) 
    // {
    // 	if(oAlq[i].getElementsByTagName("estado")[0].textContent==1)
    // 		estado= "Activo";
    // 	else
    // 		estado="Inactivo";

    // 	sTabla += "<tr>";
    //         sTabla += "<td>" + oAlq[i].getElementsByTagName("id")[0].textContent + "</td>";
    //         sTabla += "<td>" + oAlq[i].getElementsByTagName("fechaInicio")[0].textContent + "</td>";
    //         sTabla += "<td>" + oAlq[i].getElementsByTagName("fechaFinal")[0].textContent + "</td>";
    //         sTabla += "<td>" + oAlq[i].getElementsByTagName("importe")[0].textContent + "</td>";
    //         sTabla += "<td>" + oAlq[i].getElementsByTagName("dniCliente")[0].textContent + "</td>";
    //         sTabla += "<td>" + oAlq[i].getElementsByTagName("dniEmpleado")[0].textContent + "</td>";
    //         sTabla += "<td class='estado' data-estatus='"+oAlq[i].getElementsByTagName("estado")[0].textContent+"'>" + estado + "</td>";
    //     sTabla += "</tr>";
    // }

    // sTabla += "</tbody></table>";	
    $("#listadoAlquileres").empty();
    $("#listadoAlquileres").load("formularios/frmAlquiler/php/listarAlquileres.php");

    //$("#listadoAlquileres").append(sTabla);
}


$('#btnFilter').click(function() 
{
    var id = $('#filter').val();

    $('tr').show();  
    $("thead").show();               

    $.each($(".table tbody").find("tr"), function () 
    {                              
                if ($(this).text().toLowerCase().replace(/\s+/g, '').indexOf(id.replace(/\s+/g, '').toLowerCase()) == -1)
                {
                    $(this).hide();
                }
                else
                {
                    $("thead").hide();
                    $(this).parent().prev().show();
                    $(this).parent().children().show();
                    $(this).show();                   
                }
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