var oBtnListarClientes = document.frmListarCliente.btnConsultarCliente;
oBtnListarClientes.addEventListener("click", listarCliente, false);

function listarCliente()
{
	// Instanciar objeto Ajax
	var oAjax = objetoXHR();

	//2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("formularios/frmCliente/php/listaClientes.php?"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", listCliRespuesta, false);

    //4. Hacer la llamada
    oAjax.send(null);
}

function listCliRespuesta() 
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) 
    {
 		var oXML = oAjax.responseXML;

	    crearTablaClientes(oXML);
    }
}

function crearTablaClientes(oXML)
{

    if($("#filtroCli").css('display')=='none')
        $("#filtroCli").css('display', 'block');


    var sTabla = '<br><table class="table table-bordered table-striped table-hover">';
    sTabla += '<thead class="thead-dark"><tr>';
    sTabla += '<th>DNI</th><th>Nombre</th><th>Apellidos</th>';
    sTabla += '<th>Teléfono</th><th>Dirección</th><th>Localidad</th><th>C.P.</th><th>Estado</th></tr></thead>';
    sTabla += '<tbody>';

    var oClientes = oXML.getElementsByTagName("cliente");
    var estado="";

    for (i = 0; i < oClientes.length; i++) 
    {
    	if(oClientes[i].getElementsByTagName("estado")[0].textContent==1)
    		estado= "Activo";
    	else
    		estado="Inactivo";

    	sTabla += "<tr>";
        sTabla += "<td>" + oClientes[i].getElementsByTagName("id")[0].textContent + "</td>";
        sTabla += "<td>" + oClientes[i].getElementsByTagName("nombre")[0].textContent + "</td>";
        sTabla += "<td>" + oClientes[i].getElementsByTagName("apellidos")[0].textContent + "</td>";
        sTabla += "<td>" + oClientes[i].getElementsByTagName("tel")[0].textContent + "</td>";
        sTabla += "<td>" + oClientes[i].getElementsByTagName("dir")[0].textContent + "</td>";
        sTabla += "<td>" + oClientes[i].getElementsByTagName("loc")[0].textContent + "</td>";
        sTabla += "<td class='cp'>" + oClientes[i].getElementsByTagName("cp")[0].textContent + "</td>";
        sTabla += "<td class='estado' data-estatus='"+oClientes[i].getElementsByTagName("estado")[0].textContent+"'>" + estado + "</td>";
        sTabla += "</tr>";
    }

    sTabla += "</tbody></table>";	
    $("#listadoClientes").empty();
    $("#listadoClientes").append(sTabla);
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