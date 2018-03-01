var oExpRegValidarId = /^[0-9]{3}$/;
var oExpRegValidarNombre = /^[a-zA-Z\s]{3,20}$/;
var oExpRegValidarTelefono = /^[679][0-9]{8}$/;
var oExpRegValidarApellidos = /^[a-zA-Z\s]{2,40}$/;
var oExpRegValidarDni = /^[[0-9]{8}[a-zA-Z]$/;
var oExpRegValidarDuracion = /^[0-9]{2,3}$/;
var oExpRegValidarIdioma = /^[a-zA-Z]{3,20}$/;
var oExpRegValidarTitulo = /^[a-zA-Z0-9\s]{3,40}$/;
var oExpRegValidarNumSegSocial = /^[0-9]{12}$/;
var oExpRegValidarPrecio = /^[0-9]{1,}\.?[0-9]{0,2}?$/;
var oExpRegValidarFecha = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
var oExpRegValidarHora = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
var oExpRegValidadCapacidad = /^(?!0).*[0-9]{2,3}$/;
var oExpRegValidarCP = /^[0-9]{5}$/;
var oExpRegDireccion=/^[/a-zA-Z\s]{5,80}\d+$/;
var oExpRegLocalidad = /^[a-zA-Z0-9\s]{3,40}$/;

var oExpRegValidarMod = /^[a-zA-Z\s\d]{3,20}$/;
var oExpRegValidarIdMaquina = /^[0-9]{3,9}$/;
var oExpRegValidarDescripcion = /^[a-zA-Z0-9\s]{10,140}$/;
var oExpRegValidarPrecioAlq = /^[0-9]{1,}\.?[0-9]{0,2}?$/;
var oExpRegValidarIdAlquiler = /^([A]{1}-\d+)$/;

var oExpRegValidarImporte = /^\d*\.?\d+(,\d+)?/;
var oExpRegValidarPrecio = /^[0-9]{1,}\.?[0-9]{0,2}?$/;
var oExpRegValidarId = /^[0-9]{3}$/; 
var oExpRegValidarIdTransaccion = /^([T]{1}-\d+)$/; 
var oExpRegValidarFecha = /^([0-2][0-9][0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

function validarEmpleados(formulario)
{
	var bEmpleado = true;
	var aError = [];  

	//DNI
	var dniEmpleado = formulario.txtDNIEmpleado.value.trim();
	if(oExpRegValidarDni.test(dniEmpleado) == false)
	{
		if(bEmpleado)
		{
			bEmpleado = false;
			formulario.txtDNIEmpleado.focus();
		}
		claseError(formulario, 0);
		aError.push("DNI incorrecto");
	}
	else
	{
		quitarError(formulario, 0);
	}

	//NOMBRE
	var nombreEmpleado = formulario.txtNombreEmpleado.value.trim();
	if(oExpRegValidarNombre.test(nombreEmpleado) == false)
	{
		if(bEmpleado)
		{
			bEmpleado = false;
			formulario.txtNombreEmpleado.focus();
		}
		claseError(formulario, 1);
		aError.push("Nombre incorrecto");
	}
	else
	{
		quitarError(formulario, 1);
	}

	//APELLIDOS
	var apellidoEmpleado = formulario.txtApellidoEmpleado.value.trim();
	if(oExpRegValidarApellidos.test(apellidoEmpleado) == false)
	{
		if(bEmpleado)
		{
			bEmpleado = false;
			formulario.txtApellidoEmpleado.focus();
		}
		claseError(formulario, 2);
		aError.push("Apellidos incorrectos");
	}
	else
	{
		quitarError(formulario, 2);
	}

	//TELEFONO
	var telEmpleado = formulario.txtTelefonoEmpleado.value.trim();
	if(oExpRegValidarTelefono.test(telEmpleado) == false)
	{
		if(bEmpleado)
		{
			bCliente = false;
			formulario.txtTelefonoEmpleado.focus();
		}
		claseError(formulario, 3);
		aError.push("Teléfono incorrecto");
	}
	else
	{
		quitarError(formulario, 3);
	}

	//Dirección
	var dirEmpleado = formulario.txtDireccionEmpleado.value.trim();
	if(oExpRegDireccion.test(dirEmpleado) == false)
	{
		if(bEmpleado)
		{
			bEmpleado = false;
			formulario.txtDireccionEmpleado.focus();
		}
		claseError(formulario, 4);
		aError.push("Dirección incorrecta");
	}
	else
	{
		quitarError(formulario, 4);
	}

	//Localidad
	// var locEmpleado = formulario.txtLocalidadEmpleado.value.trim();
	// if(oExpRegLocalidad.test(locEmpleado) == false)
	// {
	// 	if(bEmpleado)
	// 	{
	// 		bEmpleado = false;
	// 		formulario.txtLocalidadEmpleado.focus();
	// 	}
	// 	claseError(formulario, 5);
	// 	aError.push("Localidad incorrecta");
	// }
	// else
	// {
	// 	quitarError(formulario, 5);
	// }

	//CP
	var cpEmpleado = formulario.txtCPostalEmpleado.value.trim();
	if(oExpRegValidarCP.test(cpEmpleado) == false)
	{
		if(bEmpleado)
		{
			bEmpleado = false;
			formulario.txtCPostalEmpleado.focus();
		}
		claseError(formulario, 6);
		aError.push("Código postal incorrecto");
	}
	else
	{
		quitarError(formulario, 6);
	}

	if(aError.length>0){ // Este If muestra los mensajes de error de la validación. 
						 //	Los mete en un Div y los manda a MostrarMensaje
		DeMensajesADiv(aError);
	}
	return bEmpleado;
}

function validarClientes(formulario)
{
	var bCliente = true;
	var aError = []; 

	//DNI
	var dniCliente = formulario.txtDNICliente.value.trim();
	if(oExpRegValidarDni.test(dniCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtDNICliente.focus();
		}
		claseError(formulario, 0);
		aError.push("DNI incorrecto");
	}
	else
	{
		quitarError(formulario, 0);
	}

	//NOMBRE
	var nombreCliente = formulario.txtNombreCliente.value.trim();
	if(oExpRegValidarNombre.test(nombreCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtNombreCliente.focus();
		}
		claseError(formulario, 1);
		aError.push("Nombre incorrecto");
	}
	else
	{
		quitarError(formulario, 1);
	}

	//APELLIDOS
	var apellidoCliente = formulario.txtApellidoCliente.value.trim();
	if(oExpRegValidarApellidos.test(apellidoCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtApellidoCliente.focus();
		}
		claseError(formulario, 2);
		aError.push("Apellidos incorrectos");
	}
	else
	{
		quitarError(formulario, 2);
	}

	//TELEFONO
	var telClientes = formulario.txtTelefonoCliente.value.trim();
	if(oExpRegValidarTelefono.test(telClientes) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtTelefonoCliente.focus();
		}
		claseError(formulario, 3);
		aError.push("Teléfono incorrecto");
	}
	else
	{
		quitarError(formulario, 3);
	}

	//Dirección
	var dirEmpleado = formulario.txtDireccionCliente.value.trim();
	if(oExpRegDireccion.test(dirEmpleado) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtDireccionCliente.focus();
		}
		claseError(formulario, 4);
		aError.push("Dirección incorrecta");
	}
	else
	{
		quitarError(formulario, 4);
	}

	//Localidad
	var locEmpleado = formulario.txtLocalidadCliente.value.trim();
	if(oExpRegLocalidad.test(locEmpleado) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtLocalidadCliente.focus();
		}
		claseError(formulario, 5);
		aError.push("Localidad incorrecta");
	}
	else
	{
		quitarError(formulario, 5);
	}

	//CP
	var cpCliente = formulario.txtCPostalCliente.value.trim();
	if(oExpRegValidarCP.test(cpCliente) == false)
	{
		if(bCliente)
		{
			bCliente = false;
			formulario.txtCPostalCliente.focus();
		}
		claseError(formulario, 6);
		aError.push("Código postal incorrecto");
	}
	else
	{
		quitarError(formulario, 6);
	}
	if(aError.length>0){ // Este If muestra los mensajes de error de la validación. 
						 //	Los mete en un Div y los manda a MostrarMensaje
		DeMensajesADiv(aError);
	}
	return bCliente;
}

function validarProveedor(formulario)
{
	var bValido = true;
	var aError = []; 

	//DNI
	var dniProveedor = formulario.txtDNIProveedor.value.trim();
	if(oExpRegValidarDni.test(dniProveedor) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtDNIProveedor.focus();
		}
		claseError(formulario, 0);
		aError.push("DNI incorrecto");
	}
	else
	{
		quitarError(formulario, 0);
	}

	//NOMBRE
	var nombreProveedor = formulario.txtNombreProveedor.value.trim();
	if(oExpRegValidarNombre.test(nombreProveedor) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtNombreProveedor.focus();
		}
		claseError(formulario, 1);
		aError.push("Nombre incorrecto");
	}
	else
	{
		quitarError(formulario, 1);
	}

	//APELLIDOS
	var apellidoProveedor = formulario.txtApellidoProveedor.value.trim();
	if(oExpRegValidarApellidos.test(apellidoProveedor) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtApellidoProveedor.focus();
		}
		claseError(formulario, 2);
		aError.push("Apellidos incorrectos");
	}
	else
	{
		quitarError(formulario, 2);
	}

	//Empresa
	var empresa = formulario.txtEmpresaProveedor.value.trim();
	if(empresa == "")
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtEmpresaProveedor.focus();
		}
		claseError(formulario, 3);
		aError.push("Localidad incorrecta");
	}
	else
	{
		quitarError(formulario, 3);
	}

	//TELEFONO
	var telProovedor = formulario.txtTelefonoProveedor.value.trim();
	if(oExpRegValidarTelefono.test(telProovedor) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtTelefonoProveedor.focus();
		}
		claseError(formulario, 4);
		aError.push("Teléfono incorrecto");
	}
	else
	{
		quitarError(formulario, 4);
	}

	//Dirección
	var dirPro = formulario.txtDireccionProveedor.value.trim();
	if(oExpRegDireccion.test(dirPro) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtDireccionProveedor.focus();
		}
		claseError(formulario, 5);
		aError.push("Dirección incorrecta");
	}
	else
	{
		quitarError(formulario, 5);
	}

	//Localidad
	var locPro = formulario.txtLocalidadProveedor.value.trim();
	if(oExpRegLocalidad.test(locPro) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtLocalidadProveedor.focus();
		}
		claseError(formulario, 6);
		aError.push("Localidad incorrecta");
	}
	else
	{
		quitarError(formulario, 6);
	}

	//CP
	var cpProveedor = formulario.txtCPostalProveedor.value.trim();
	if(oExpRegValidarCP.test(cpProveedor) == false)
	{
		if(bValido)
		{
			bValido = false;
			formulario.txtCPostalProveedor.focus();
		}
		claseError(formulario, 7);
		aError.push("Código postal incorrecto");
	}
	else
	{
		quitarError(formulario, 7);
	}
	if(aError.length>0){ // Este If muestra los mensajes de error de la validación. 
						 //	Los mete en un Div y los manda a MostrarMensaje
		DeMensajesADiv(aError);
	}
	return bValido;
}


function validarAlquiler(formulario)
{
	var bAlquiler = true;
	var aError = [];  

	//ID
	var idAlquiler = formulario.txtIDAlquiler.value.trim();
	if(oExpRegValidarIdAlquiler.test(idAlquiler) == false)
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			formulario.txtIDAlquiler.focus();
		}
		claseError(formulario, 0);
		aError.push("ID incorrecto");
	}
	else
	{
		quitarError(formulario, 0);
	}


	//fecha inicio
	var fechaAlquiler = formulario.txtFechaIniAlquiler.value.trim();
	if(fechaAlquiler == "")
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			formulario.txtFechaIniAlquiler.focus();
		}
		claseError(formulario, 1);
		aError.push("Fecha de inicio incorrecta");
	}
	else
	{
		quitarError(formulario, 1);
	}

	//fecha final
	var fechaAlquilerFin = formulario.txtFechaFinAlquiler.value.trim();
	if(fechaAlquilerFin == "" )
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			formulario.txtFechaFinAlquiler.focus();
		}
		claseError(formulario, 2);
		aError.push("Fecha de finalización incorrecta");
	}
	else
	{
		quitarError(formulario, 2);
	}


	//Maquinas escogidas
	var selectMaquinas=formulario.maquinasSeleccionadas;
	if(selectMaquinas[0]==null){
		if(bAlquiler)
		{
			bAlquiler = false;
			selectMaquinas.focus();
		}
		selectMaquinas.classList.add('is-invalid');
		aError.push("Debe seleccionar al menos una máquina")
	}
	else
		selectMaquinas.classList.remove("is-invalid");

	

	//Cliente
	var cliente = formulario.cliente.value.trim();
	if(cliente == "")
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			formulario.cliente.focus();
		}
		claseError(formulario, 5);
		aError.push("Indique un Cliente");
	}
	else
	{
		quitarError(formulario, 5);
	}



	//Empleado
	var empleado = formulario.empleado.value.trim();
	if(empleado == "")
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			formulario.empleado.focus();
		}
		claseError(formulario, 6);
		aError.push("Indique un empleado");
	}
	else
	{
		quitarError(formulario, 6);
	}	

	//IMPORTE
	var importeAlquiler = formulario.txtImporteAlquiler.value.trim();
	if(oExpRegValidarImporte.test(importeAlquiler) == false)
	{
		if(bAlquiler)
		{
			bAlquiler = false;
			formulario.txtImporteAlquiler.focus();
		}
		claseError(formulario, 7);
		aError.push("Error en el Importe");
	}
	else
	{
		quitarError(formulario, 7);
	}

	if(aError.length>0){ // Este If muestra los mensajes de error de la validación. 
						 //	Los mete en un Div y los manda a MostrarMensaje
		DeMensajesADiv(aError);
	}

	return bAlquiler;
}


function validarMaquina(formulario)
{
	var bMaquina = true;
	var aError = []; 

	//MODELO
	var modMaquina = formulario.txtModeloMaquina.value.trim();
	if(oExpRegValidarMod.test(modMaquina) == false)
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.txtModeloMaquina.focus();
		}
		claseError(formulario, 0);
		aError.push("Modelo incorrecto");
	}
	else
	{
		quitarError(formulario, 0);
	}

	//ID
	var idMaquina = formulario.txtIDMaquina.value.trim();
	if(oExpRegValidarIdMaquina.test(idMaquina) == false)
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.txtIDMaquina.focus();
		}
		claseError(formulario, 1);
		aError.push("ID incorrecta");
	}
	else
	{
		quitarError(formulario, 1);
	}

	//NOMBRE
	var nomMaquina = formulario.txtNombreMaquina.value.trim();
	if(oExpRegValidarNombre.test(nomMaquina) == false)
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.txtNombreMaquina.focus();
		}
		claseError(formulario, 2);
		aError.push("El nombre no es válido");
	}
	else
	{
		quitarError(formulario, 2);
	}

	//DESCRIPCION
	var descMaquina = formulario.txtDecMaquina.value.trim();
	if(oExpRegValidarDescripcion.test(descMaquina) == false)
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.txtDecMaquina.focus();
		}
		claseError(formulario, 3);
		aError.push("La descripción no es válida");
	}
	else
	{
		quitarError(formulario, 3);
	}

	//ALQUILER
	var alquilerMaquina = formulario.txtPrecioMaquina.value.trim();
	if(oExpRegValidarPrecioAlq.test(alquilerMaquina) == false)
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.txtPrecioMaquina.focus();
		}
		claseError(formulario, 4);
		aError.push("No es un precio válido");
	}
	else
	{
		quitarError(formulario, 4);
	}

	//Fecha de compra
	var fecha = formulario.fechaCompra.value.trim();
	if(fecha == "")
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.fechaCompra.focus();
		}
		claseError(formulario, 5);
		aError.push("No es una fecha válida");
	}
	else
	{
		quitarError(formulario, 5);
	}

	//Importe
	var alquilerMaquina = formulario.precioCompra.value.trim();
	if(oExpRegValidarPrecioAlq.test(alquilerMaquina) == false)
	{
		if(bMaquina)
		{
			bMaquina = false;
			formulario.precioCompra.focus();
		}
		claseError(formulario, 6);
		aError.push("No es un precio válido");
	}
	else
	{
		quitarError(formulario, 6);
	}

	//Proveedor
	var proveedor = $(formulario).find('.comboProveedor').val().trim();
	if(proveedor == "")
	{
		if(bMaquina)
		{
			bMaquina = false;
			$(formulario).find('.comboProveedor')[0].focus();
		}
		claseError(formulario, 7);
		aError.push("No es un proveedor válido");
	}
	else
	{
		quitarError(formulario, 7);
	}

	if(aError.length>0){ // Este If muestra los mensajes de error de la validación. 
						 //	Los mete en un Div y los manda a MostrarMensaje
		DeMensajesADiv(aError);
	}
	return bMaquina;
}