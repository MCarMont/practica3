// //AJAX
// function instanciarXHR() 
// {
//     var xhttp = null;

//     if (window.XMLHttpRequest) {
//         xhttp = new XMLHttpRequest();
//     } else // code for IE5 and IE6
//     {
//         xhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     return xhttp;
// }


function objetoXHR() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
            for (var i = 0; i < versionesIE.length; i++) {
                try {
                    return new ActiveXObject(versionesIE[i]);
                } catch (errorControlado) {} //Capturamos el error,
            }
        }
        throw new Error("No se pudo crear el objeto XMLHttpRequest");    
}