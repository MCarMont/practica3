var oBtnListarDev = document.frmListarDev.btnConsultarDev;
oBtnListarDev.addEventListener("click", listarDevolucion, false);

function listarDevolucion()
{
	// Instanciar objeto Ajax
	var oAjax = objetoXHR();

	//2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("formularios/frmDevoluciones/php/listarDevoluciones.php"));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", listDevRespuesta, false);

    //4. Hacer la llamada
    oAjax.send(null);
}

function listDevRespuesta() 
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) 
    {
 		var oXML = oAjax.responseXML;

	    crearTabla(oXML);
    }
}

function crearTabla(oXML)
{
    if($("#filtroDev").css('display')=='none')
        $("#filtroDev").css('display', 'block');

    var sTabla = '<br><table class="table table-bordered table-striped table-hover">';
    sTabla += '<thead class="thead-dark"><tr>';
    sTabla += '<th>ID</th><th>Alquiler</th><th>Fecha devolución</th>';
    sTabla += '<th>Motivo</th><th>Empleado</th></tr></thead>';
    sTabla += '<tbody>';

    var oDevolucion = oXML.getElementsByTagName("devolucion");

    for (i = 0; i < oDevolucion.length; i++) 
    {

    	sTabla += "<tr>";
            sTabla += "<td class='id'>" + oDevolucion[i].getElementsByTagName("idDevolucion")[0].textContent + "</td>";
            sTabla += "<td class='nombre'>" + oDevolucion[i].getElementsByTagName("idAlquiler")[0].textContent + "</td>";
            sTabla += "<td>" + oDevolucion[i].getElementsByTagName("fechaDevolucion")[0].textContent + "</td>";
            sTabla += "<td>" + oDevolucion[i].getElementsByTagName("sMotivo")[0].textContent + "</td>";
            sTabla += "<td>" + oDevolucion[i].getElementsByTagName("empleado")[0].textContent + "</td>";
        sTabla += "</tr>";
    }

    sTabla += "</tbody></table>";	
    $("#listadoDev").empty();
    $("#listadoDev").append(sTabla);
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

