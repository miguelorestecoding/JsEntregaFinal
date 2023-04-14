//Inicialización de Arrays
let impuestos = [];
let dolares = [];

//Inicialización de Variables
let inputPrecioDolarBancoNacion;
let precioDolarBancoNacion;

let formularioImpuestos;
let inputNombreImpuesto;
let inputPorcentajeImpuesto;
let contenedorImpuestos;

let formularioDolares;
let inputNombreDolar;
let inputImpuestosAplicados;
let contenedorDolares;

let formularioPrecioDolarBancoNacion;

//Crea Clases de Objetos
// Objeto Impuestos
class Impuesto {
  constructor(idImpuesto, nombreImpuesto, porcentajeImpuesto) {
    this.idImpuesto = idImpuesto;
    this.nombreImpuesto = nombreImpuesto.toUpperCase();
    this.porcentajeImpuesto = porcentajeImpuesto;
  }
}
//Objeto Dolares
class Dolar {
  constructor(idDolar, NombreDolar, ImpuestosAplicados, totalPorcentaje) {
    this.idDolar = idDolar;
    this.NombreDolar = NombreDolar;
    this.ImpuestosAplicados = ImpuestosAplicados;
    this.totalPorcentaje = totalPorcentaje;
  }
}

//Inicializa Elementos
function inicializarElementos() {
  inputPrecioDolarBancoNacion = document.getElementById(
    "inputPrecioDolarBancoNacion"
  );

  formularioImpuestos = document.getElementById("formularioImpuestos");
  inputNombreImpuesto = document.getElementById("inputNombreImpuesto");
  inputPorcentajeImpuesto = document.getElementById("inputPorcentajeImpuesto");
  contenedorImpuestos = document.getElementById("contenedorImpuestos");

  formularioDolares = document.getElementById("formularioDolares");
  inputNombreDolar = document.getElementById("inputNombreDolar");
  inputImpuestosAplicados = document.getElementById("inputImpuestosAplicados");
  contenedorDolares = document.getElementById("contenedorDolares");

  formularioPrecioDolarBancoNacion = document.getElementById(
    "formularioPrecioDolarBancoNacion"
  );
}

//Incilializa Eventos
function inicializarEventos() {
  formularioImpuestos.onsubmit = (event) => validarFormularioImpuestos(event);
  formularioDolares.onsubmit = (event) => validarFormularioDolares(event);
  formularioPrecioDolarBancoNacion.onsubmit = (event) =>
    validarFormularioPrecioDolarBancoNacion(event);
}

// ** FUNCIONES
//Valida Formulario Precio Dolar BancoNacion
function validarFormularioPrecioDolarBancoNacion(event) {
  event.preventDefault();
  actualizaDolarBancoNacionStorage();
  if (precioDolarBancoNacion == "") {
    alert("No ha ingresado un precio para el dolar valido, por favor revise.");
  } else {
    const textoOrigenTipoDeCambio = document.getElementById(
      "textoOrigenTipoDeCambio"
    );
    textoOrigenTipoDeCambio.innerText =
      "☝ Tipo de Cambio Ingresado por el Usuario";
    pintarDolares();
  }
}

// Valida Formulario Impuestos
function validarFormularioImpuestos(event) {
  event.preventDefault();
  let idImpuesto = parseInt(obtenerMaxIdImpuestos()) + 1
  let nombreImpuesto = inputNombreImpuesto.value;
  let porcentajeImpuesto = parseInt(inputPorcentajeImpuesto.value);
  const NombreImpuestoExiste = impuestos.some(
    (impuesto) => impuesto.nombreImpuesto === nombreImpuesto
  );

  if (nombreImpuesto === "" || isNaN(porcentajeImpuesto)) {
    Swal.fire({
      icon: "error",
      title: "🤨 Parece que algo falta?",
      text: "Recuerda ponerle nombre y procentaje al impuesto que estas creando!",
    });
    formularioImpuestos.reset();
  } else if (!NombreImpuestoExiste) {
    let impuesto = new Impuesto(idImpuesto, nombreImpuesto, porcentajeImpuesto);

    impuestos.push(impuesto);
    formularioImpuestos.reset();
    pintarImpuestos();
    actualizaImpuestosStorage();
  } else {
    alert("Ya existe un impuesto con ese nombre, utiliza otro");
  }
}

//Valida Formulario Dolares
function validarFormularioDolares(event) {
  event.preventDefault();
  inputImpuestosAplicados = [];
  let checkboxesImpuestosAplicados = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  checkboxesImpuestosAplicados.forEach((checkbox) => {
    inputImpuestosAplicados.push(JSON.parse(checkbox.value));
  });
  let idDolar = parseInt(obtenerMaxIdDolares()) + 1
  let nombreDolar = inputNombreDolar.value;
  let ImpuestosAplicados = inputImpuestosAplicados;
  let totalPorcentaje = 0;
  for (i = 0; i < ImpuestosAplicados.length; i++) {
    totalPorcentaje += ImpuestosAplicados[i].porcentajeImpuesto;
  }

  if (nombreDolar != "" && totalPorcentaje != 0) {
    let dolar = new Dolar(
      idDolar,
      nombreDolar,
      ImpuestosAplicados,
      totalPorcentaje
    );
    dolares.push(dolar);

    formularioDolares.reset();
    pintarDolares();
    desmarcarCheckboxImpuestos();
    actualizaDolaresStorage();
  } else {
    Swal.fire({
      icon: "error",
      title: "🤨 Parece que algo falta?",
      text: "Revisa que estés ingresando un nombre válido para el dolar y que haya al menos 1 impuesto seleccionado. Si no visualizas como seleccionar impuestos debes crearlos primero!",
    });
  }
}

//Limpia Checkbox
function desmarcarCheckboxImpuestos() {
  let allcheckboxes = document.querySelectorAll("input[type=checkbox]");
  allcheckboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
}

//STORAGE
//Actualiza Storage
function actualizaDolarBancoNacionStorage() {
  precioDolarBancoNacion = inputPrecioDolarBancoNacion.value;
  localStorage.setItem("precioDolarBancoNacion", precioDolarBancoNacion);
}
function actualizaImpuestosStorage() {
  let impuestosJSON = JSON.stringify(impuestos);
  localStorage.setItem("impuestos", impuestosJSON);
}
function actualizaDolaresStorage() {
  let dolaresJSON = JSON.stringify(dolares);
  localStorage.setItem("dolares", dolaresJSON);
}

function obtenerMaxIdImpuestos() {
  let maxIdImpuestos = 0
  if (impuestos.length > 0) {
        const idImpuestos = impuestos.map((impuesto)=> impuesto.idImpuesto)
      maxIdImpuestos = Math.max(...idImpuestos) 
  }
  return maxIdImpuestos
}

function obtenerMaxIdDolares() {
  let maxIdDolares = 0
  if (dolares.length > 0) {
        const idDolares = dolares.map((dolar)=> dolar.idDolar)
      maxIdDolares = Math.max(...idDolares) 
  }
  return maxIdDolares
}


//Obtener desde Storage
function obtenerImpuestosStorage() {
  let impuestosJSON = localStorage.getItem("impuestos");
  if (impuestosJSON != null) {
    impuestos = JSON.parse(impuestosJSON);
    pintarImpuestos();
  }
}
function obtenerDolaresStorage() {
  let dolaresJSON = localStorage.getItem("dolares");
  if (dolaresJSON != null) {
    dolares = JSON.parse(dolaresJSON);
    pintarDolares();
  }
}
//Obtener desde .json
function obtenerImpuestosServer() {
  fetch("./tiposDeImpuesto.json")
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      impuestos = jsonResponse;
      actualizaImpuestosStorage()
      actualizaDolaresStorage()
      pintarImpuestos();
    });
}

function obtenerDolaresServer() {
  fetch("./tiposDeDolar.json")
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      dolares = jsonResponse;
      pintarDolares();
      actualizaDolaresStorage();
    });
}

function obtenerDolaresStorage() {
  let dolaresJSON = localStorage.getItem("dolares");
  if (dolaresJSON != null) {
    dolares = JSON.parse(dolaresJSON);
    pintarDolares();
  }
}

//Limpiar Storage
const limpiarStorageBtn = document.getElementById("limpiar-storage");
limpiarStorageBtn.addEventListener("click", function () {
  localStorage.clear();
  impuestos = [];
  dolares = [];
  pintarImpuestos();
  pintarDolares();
});

// API Precio Dolar Actualizado
let ultimaCotizacion = "";
function obtieneDolarOficialDeDolarSi() {
  const url = "https://www.dolarsi.com/api/api.php?type=dolar";
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } 
    })
    .then((data) => {
      precioDolarBancoNacion = parseFloat(data[0].casa.venta);
      document.getElementById("inputPrecioDolarBancoNacion").value =
        precioDolarBancoNacion;
        actualizaDolarBancoNacionStorage()
      pintarDolares();
    })
    .catch((error) => {
      console.error(error);
    });
}

//IMPUESTOS
// Eliminar Impuestos
function eliminarImpuesto(idImpuesto) {
  let columnaImpuestoBorrar = document.getElementById(
    `columnaImpuesto-${idImpuesto}`
  );
  let indiceBorrar = impuestos.findIndex(
    (impuesto) => impuesto.idImpuesto === idImpuesto
  );
  impuestos.splice(indiceBorrar, 1);
  columnaImpuestoBorrar.remove();
  actualizaImpuestosStorage();
  obtenerMaxIdImpuestos()
}

//Muestra Cards Impuestos
function pintarImpuestos() {
  contenedorImpuestos.innerHTML = "";
  impuestos.forEach((impuesto) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columnaImpuesto-${impuesto.idImpuesto}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${impuesto.idImpuesto}</b>
                </p>
                <p class="card-text">Nombre del Impuesto:
                    <b>${impuesto.nombreImpuesto}</b>
                </p>
                <p class="card-text">Porcentaje del Impuesto:
                    <b>%${impuesto.porcentajeImpuesto}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminarImpuesto-${
                      impuesto.idImpuesto
                    }" >Eliminar</button>
                    <label>
                      <input type="checkbox" name="checkAgregaImpuesto-${
                        impuesto.idImpuesto
                      }" value=${JSON.stringify(impuesto)}>
                        Incluir
                    </label>
                </div>
            </div>`;
    ``;

    contenedorImpuestos.append(column);

    let botonEliminarImpuesto = document.getElementById(
      `botonEliminarImpuesto-${impuesto.idImpuesto}`
    );
    botonEliminarImpuesto.onclick = () => eliminarImpuesto(impuesto.idImpuesto);
  });
}

//Dolares
//Muestra Cards Dolares
function pintarDolares() {
  contenedorDolares.innerHTML = "";
  dolares.forEach((dolar) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columnaDolar-${dolar.idDolar}`;
    column.innerHTML = `
            <div class="card h-100">
                <div class="card-body text-center">
                <p class="card-text">ID:
                    <b>${dolar.idDolar}</b>
                </p>
                <p class="card-text bg-warning">Nombre del Dolar:
                    <b>${dolar.NombreDolar}</b>
                </p>
                <p class="card-text bg-warning">Valor Compra:
                    <b>$${
                      precioDolarBancoNacion * (1 + dolar.totalPorcentaje / 100)
                    }</b>
                </p>
                <p class="card-text">Impuestos Aplicados:
                    <b>${dolar.ImpuestosAplicados.map(
                      (impuesto) => impuesto.nombreImpuesto
                    ).join(", ")}</b>
                </p>
                <p class="card-text">Total Porcentaje:
                    <b>%${dolar.totalPorcentaje}</b>
                </p>
                </div>
                <div class="card-footer text-center">
                    <button class="btn btn-danger" id="botonEliminarDolar-${
                      dolar.idDolar
                    }" >Eliminar</button>
                </div>
            </div>`;
    ``;

    contenedorDolares.append(column);

    let botonEliminarDolar = document.getElementById(
      `botonEliminarDolar-${dolar.idDolar}`
    );
    botonEliminarDolar.onclick = () => eliminarDolar(dolar.idDolar);
  });
}
// Eliminar Dolares
function eliminarDolar(idDolar) {
  let columnaDolarBorrar = document.getElementById(`columnaDolar-${idDolar}`);
  let indiceBorrar = dolares.findIndex((dolar) => dolar.idDolar === idDolar);
  dolares.splice(indiceBorrar, 1);
  columnaDolarBorrar.remove();
  actualizaDolaresStorage();
}

//Función main
function main() {
  obtieneDolarOficialDeDolarSi();
  inicializarElementos();
  inicializarEventos();
  actualizaDolarBancoNacionStorage();
  obtenerImpuestosServer()
  // obtenerImpuestosStorage();
  obtenerDolaresServer();
  // obtenerDolaresStorage();
}

//Ejecuta / Llama a main
main();

/* Pendiente
 * Si los nombres del dolar tienen espacio da error al querer pasar a JSON.
 */
