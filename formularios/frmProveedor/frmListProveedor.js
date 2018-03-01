var oBtnListarProv = document.frmListarProveedor.btnConsultarProv;
oBtnListarProv.addEventListener("click", listarProv, false);

function listarProv()
{
	// Instanciar objeto Ajax
	var oAjax = objetoXHR();

	//2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("formularios/frmProveedor/php/listaProv.php"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", listProvRespuesta, false);

    //4. Hacer la llamada
    oAjax.send(null);
}

function listProvRespuesta() 
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) 
    {
 		var oXML = oAjax.responseXML;

	    crearTablaProv(oXML);
    }
}

function crearTablaProv(oXML)
{

    if($("#filtroProv").css('display')=='none')
        $("#filtroProv").css('display', 'block');

    var sTabla = '<br><table class="table table-bordered table-striped table-hover">';
    sTabla += '<thead class="thead-dark"><tr>';
    sTabla += '<th>DNI</th><th>Nombre</th><th>Apellidos</th>';
    sTabla += '<th>Empresa</th><th>Teléfono</th><th>Dirección</th><th>Localidad</th><th>C.P.</th><th>Estado</th></tr></thead>';
    sTabla += '<tbody>';

    var oProv = oXML.getElementsByTagName("proveedor");
    var estado="";

    for (i = 0; i < oProv.length; i++) 
    {
    	if(oProv[i].getElementsByTagName("estado")[0].textContent==1)
    		estado= "Activo";
    	else
    		estado="Inactivo";

    	sTabla += "<tr>";
        sTabla += "<td class='id'>" + oProv[i].getElementsByTagName("id")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("nombre")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("apellidos")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("empresa")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("tel")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("dir")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("loc")[0].textContent + "</td>";
        sTabla += "<td>" + oProv[i].getElementsByTagName("cp")[0].textContent + "</td>";
        sTabla += "<td class='estado' data-estatus='"+oProv[i].getElementsByTagName("estado")[0].textContent+"'>" + estado + "</td>";
        sTabla += "</tr>";
    }

    sTabla += "</tbody></table>";	
    $("#listadoProveedor").empty();
    $("#listadoProveedor").append(sTabla);
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