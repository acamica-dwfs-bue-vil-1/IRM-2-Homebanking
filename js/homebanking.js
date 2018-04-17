	//Declaración de variables
	var nombreUsuario = "Ivan";
	var saldoCuenta = 3800;
	var limiteExtraccion = 5000;
	var Agua = 300;
	var Luz = 450;
	var Internet = 600;
	var Telefono = 300;
	var password = "1234";
	var cbus = [];

	//Ejecución de las funciones que actualizan los valores de las variables en el HTML
	cargarNombreEnPantalla();
	actualizarSaldoEnPantalla();
	actualizarLimiteEnPantalla();

	function sumarDinero (monto){
		saldoCuenta += monto;
		actualizarSaldoEnPantalla();	
	}

	function restarDinero (monto){
		saldoCuenta -= monto;
		actualizarSaldoEnPantalla();
	}

	function muestraOperacion(accion, operacion, monto){
   		 alert("Has " + accion + ": $" + monto + "\n" +
        	   "Saldo anterior: $" + operacion + "\n" +
        	   "Saldo actual: $" + saldoCuenta);
	}

	function cambiarLimiteDeExtraccion(monto){
		monto = prompt("Ingrese monto del limite de extracción que desea ahora");
		if(monto.replace(/[^0-9]/g, ' ')!==monto){
	    	alert("Solo ingresar numeros enteros");
		}else{
			monto = parseInt(monto);
			limiteExtraccion = monto;
			alert("Has modificado el limite de extracción a $" + limiteExtraccion);
			actualizarLimiteEnPantalla();
		}

	}

	function extraerDinero(monto){
		monto = prompt("Ingrese monto a extraer multiplos de 100");
		if(monto.replace(/[^0-9]/g, ' ')!==monto){
	    	alert("Solo ingresar numeros enteros y multiplos de 100");
		}else{
			monto = parseInt(monto);
			if(monto <= saldoCuenta && monto <= limiteExtraccion && monto % 100 == 0){
				restarDinero(monto);
				muestraOperacion("Extraido", saldoCuenta + monto, monto);	
			}else{
				alert("Error, por favor verifique que:" + "\n" +
					"El monto indicado debe ser menor o igual al saldo en la cuenta" + "\n" + 
					"El monto supera al limite de extracción" + "\n" +
					"El monto indicado no es multiplo de 100");
			}
		}
	}

	function depositarDinero(monto){
		monto = prompt("Ingrese monto a depositar");
		if(monto.replace(/[^0-9]/g, '' ) !== monto || monto == null || monto == "" || isNaN(monto)){
	    	alert("Solo ingresar numeros enteros");
		}else{
			monto = parseInt(monto);
			sumarDinero(monto);
			muestraOperacion("Depositado", saldoCuenta - monto, monto);
		}
	}


	function pagarServicio(seleccion){
		seleccion = prompt("Ingrese que servicio desea pagar" + "\n" + 
			"1. Agua = $300" + "\n" + 
			"2. Luz = $450" + "\n" + 
			"3. Internet = $600" + "\n" + 
			"4. Telefono = $300");
 		if (seleccion == null || seleccion == ""){
 			alert("Por favor ingrese un servicio a pagar");
 		}else{
 			seleccion = parseInt(seleccion);
 			switch (seleccion){
 				case 1:
 					servicioSeleccionado("Agua", Agua);
 					break;
 				case 2:
 					servicioSeleccionado("Luz", Luz);
 					break;
 				case 3:
 					servicioSeleccionado("Internet", Internet);
 					break;
 				case 4:
 					servicioSeleccionado("Telefono", Telefono);
 					break;
 				default:
 					alert("El dato ingresado no pertenece aun servicio del listado, por favor intentelo nuevamente");
 					break;
 			}
 		}
 	}

 		function servicioSeleccionado(servicio, monto){
 		if (saldoCuenta < monto){
 			alert("El saldo en su cuenta no cubre el monto del servicio a pagar");
 		}else{
 			alert("Has pagado el servicio: " + servicio + "\n" + 
 				"Saldo al pagar: $" + saldoCuenta + "\n" +
 				"Monto servicio: $" + monto + "\n" + 
 				"Saldo Actual: $" + (saldoCuenta - monto));
 			restarDinero(monto);
 		}
 	}

	function transferirDinero(cbu, monto){
		cbu = prompt("Ingresar el numero de CBU a quien quiera transferir dinero");
		if (cbu.replace(/[^0-9]/g, ' ')!==cbu){
	    	alert("Solo ingresar numeros enteros");
		}else{
			cbu = parseInt(cbu);
			monto = cbus.includes(cbu);
			if (monto !== true){
				alert("El CBU que ingreso no se encuentra en la base de datos, por favor intentelo nuevamente o si es nuevo, debe agregarlo previamente");
			}else{
				transferir();
			}
		}
	}	

	function transferir(monto){
		monto = prompt("Ingrese monto a transferir");
		if(monto.replace(/[^0-9]/g, ' ')!==monto){
	    	alert("Solo ingresar numeros enteros");
		}else{
			monto = parseInt(monto);
			if(monto <= saldoCuenta && monto){
				restarDinero(monto);
				muestraOperacion("Transfirió", saldoCuenta + monto, monto);	
			}else{
				alert("El monto que desea transferir supera al saldo actual de su cuenta");
			}
		}	
	}

	function agregarQuitar(eleccion){
		eleccion = prompt("Eliga que funcion desea realizar:" + "\n" + 
			"1. Agregar CBU Nuevo" + "\n" +
			"2. Quitar CBU existente");
		if (eleccion == null || eleccion == ""){
 			alert("Por favor ingrese un servicio a pagar");
 		}else{
 			eleccion = parseInt(eleccion);
 			switch (eleccion){
 				case 1:
 					agregarCBU();
 					break;
 				case 2:
 					quitarCBU();
 					break;
 				default:
 					alert("Ingresar un valor correcto!");
 					break;
 			}
 		}		
	}

	function agregarCBU(cbuNuevo){
		cbuNuevo = prompt("Ingrese el nuevo CBU");
		if (cbuNuevo.replace(/[^0-9]/g, ' ')!==cbuNuevo){
	    	alert("Solo ingresar numeros enteros");
		}else{
			cbuNuevo = parseInt(cbuNuevo);
			cbus.push(cbuNuevo);
			alert("Se agrego el numero " + cbuNuevo + " en su lista de CBU para realizar transferencias")
		}
	}

	function quitarCBU(cbuViejo, aEliminar){
		cbuViejo = prompt("Ingrese e CBU que desea eliminar");
		if (cbuViejo.replace(/[^0-9]/g, ' ')!==cbuViejo){
	    	alert("Solo ingresar numeros enteros");
		}else{
			cbuViejo = parseInt(cbuViejo);
			monto = cbus.includes(cbuViejo);
			if (monto !== true){
				alert("El CBU que desea eliminar no se encuentra en la base de datos, por favor intentelo nuevamente");
			}else{
				aEliminar = cbus.indexOf(cbuViejo);
				cbus.splice(aEliminar, 1);
				alert("Se elimino el numero " + cbuViejo + " de su lista de CBU para realizar transferencias");	
			}
		}

	}

window.onload(iniciarSesion()); 

	function iniciarSesion(clave){
		clave = prompt ("Ingrese la clave de acceso a su cuenta");
		if (clave.replace(/[^0-9]/g, '')!==clave){
	    	errorCodido();
		}else{
			if (password !== clave){
				errorCodido();
			} else {
				alert("Bienvenido " + nombreUsuario);
			} 
		}
	}

	function errorCodido(){
		alert("Usted ingresó mal la clave de acceso y por eso sera retenido el saldo, por favor contactese con el banco para mas información.")
		saldoCuenta = 0;
		nombreUsuario = "";
		cargarNombreEnPantalla();
		actualizarSaldoEnPantalla();
	}

	//Funciones que actualizan el valor de las variables en el HTML
	function cargarNombreEnPantalla() {
	    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
	}

	function actualizarSaldoEnPantalla() {
	    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
	}

	function actualizarLimiteEnPantalla() {
	    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
	}

