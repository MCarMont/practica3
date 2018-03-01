var oBtnListarMaq = document.frmListarMaquina.btnConsultarMaq;
oBtnListarMaq.addEventListener("click", listarMaq, false);

function listarMaq()
{
    
	// Instanciar objeto Ajax
	var oAjax = objetoXHR();

	//2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("formularios/frmMaquina/php/listaMaquina.php"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", listMaqRespuesta, false);

    //4. Hacer la llamada
    oAjax.send(null);
}

function listMaqRespuesta() 
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) 
    {
 		var oXML = oAjax.responseXML;

	    crearTablaMaq(oXML);
    }
}

function crearTablaMaq(oXML)
{
    if($("#filtroMaq").css('display')=='none')
        $("#filtroMaq").css('display', 'block');
    var sTabla = '<br><table class="table table-bordered table-striped table-hover">';
    sTabla += '<thead class="thead-dark"><tr>';
    sTabla += '<th>Modelo</th><th>Id</th><th>Nombre</th>';
    sTabla += '<th>Descripción</th><th>Precio</th><th>Fecha Compra</th><th>Coste</th><th>Proveedor</th><th>EStado</th></tr></thead>';
    sTabla += '<tbody>';

    var oMaq = oXML.getElementsByTagName("maquina");

    for (i = 0; i < oMaq.length; i++) 
    {
        if(oMaq[i].getElementsByTagName("estado")[0].textContent==1)
            estado= "Activo";
        else
            estado="Inactivo";

    	sTabla += "<tr>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("modelo")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("id")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("nombre")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("descripcion")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("precio")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("fecha")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("coste")[0].textContent + "</td>";
        sTabla += "<td>" + oMaq[i].getElementsByTagName("proveedor")[0].textContent + "</td>";
        sTabla += "<td class='estado' data-estatus='"+oMaq[i].getElementsByTagName("estado")[0].textContent+"'>" + estado + "</td>";
        sTabla += "</tr>";
    }

    sTabla += "</tbody></table>";	
    $("#listadoMaquina").empty();
    $("#listadoMaquina").append(sTabla);
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

