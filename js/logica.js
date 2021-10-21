//Llamo a la función de imprimir tareas por si ya se han guardado algunas
imprimirTareas();

//EVENTOS DE BOTONES===========================================================================
//Obtengo el botón de agregar tarea para crearle el evento
var botonAgregar= document.getElementById('botonAgregar');
//Le asigno un event listener con la función a ejecutar cuando ocurra el evento
botonAgregar.addEventListener("click",verificarEspaciosEnBlanco);
//============================================================================================


//DEFINICIÓN DE FUNCIONES======================================================================
//--------------------------------------------------------------------------------------------
function verificarEspaciosEnBlanco(){
  //verifico si los campos han sido llenados
  var tituloTarea=document.getElementById("tituloTarea").value;
  var descripcionTarea=document.getElementById("descripcionTarea").value;

  //si alguno de los campos está vacío entonces significa que sí hay espacios en blanco que hace falta llenar
  if((tituloTarea=="")||(descripcionTarea=="")){
    //si hay campos vacíos se crea una alerta en html, con un botón que permite cerrar la alerta
    document.getElementById('alertas').innerHTML=
    `
    <h6 class="alerta">¡Alerta!: Debe llenar todos los campos de texto</h6>
    <button class="botonCerrarAlerta" id="botonCerrarAlerta" type="button" name="button" onclick="cerrarAlerta()">x</button>
    `;
  }
  else{
    //si no hay campos vacíos, significa que se llenó la información necesaria, y se procede a agregar la tarea
    agregarTarea();
  }

}

//---------------------------------------------------------------------------------------------
function cerrarAlerta(){
  //Sencillamente se elimina el html de la alerta
  document.getElementById('alertas').innerHTML="";
}


//---------------------------------------------------------------------------------------------
function agregarTarea(){
  //obtengo lo escrito en los cajones de texto de la interfaz
  var tituloTarea=document.getElementById('tituloTarea').value;
  var descripcionTarea=document.getElementById("descripcionTarea").value;
  //dichos valores los pongo en un objeto tarea como sus atributos
  var tarea = {
    titulo: tituloTarea,
    descripcion: descripcionTarea
  };
  console.log(tarea);

  //compruebo si no hay previamente tareas creadas
  if(localStorage.getItem('tareas') === null){
    //como no hay, creo un arreglo, en su primera posición inserto la tarea capturada, y guardo el arreglo de una posición
    let tareasAlmacenadas = [];
    tareasAlmacenadas.push(tarea);
    localStorage.setItem('tareas',JSON.stringify(tareasAlmacenadas));
  }
  else{
    //como sí hay tareas previamente creadas, es decir que sí existe un dato clave-valor cuya clave es 'tareas', significa que debo agregar la tarea capturada a la lista existente, entonces capturo la lista almacenada parseada, agrego a su ultima posición la tarea capturada y de nuevo la guardo ya actualizada.
    let tareasAlmacenadas = JSON.parse(localStorage.getItem('tareas'));
    tareasAlmacenadas.push(tarea);
    localStorage.setItem('tareas',JSON.stringify(tareasAlmacenadas));
  }
  //imprimo las tareas actualizando la agregación de la nueva tarea
  imprimirTareas();

  //Ya que se guardó la tarea, limpio los cajones de texto y alertas
  document.getElementById('tituloTarea').value="";
  document.getElementById('descripcionTarea').value="";
  document.getElementById('alertas').innerHTML="";
}

//---------------------------------------------------------------------------------------------
//función que se activará con el botón eliminar, recibe como parámetro la posición del arreglo de tareas que se desea eliminar
function eliminarTarea(posicionDeLaTareaAEliminar) {
  //obtengo el arreglo de las tareas almacenadas
  let tareasAlmacenadas = JSON.parse(localStorage.getItem('tareas'));
  //elimino la posición del arreglo que recibí como parámetro
  tareasAlmacenadas.splice(posicionDeLaTareaAEliminar,1);
  //guardo el arreglo con esta nueva actualización
  localStorage.setItem('tareas',JSON.stringify(tareasAlmacenadas));
  //imprimo las tareas para que se actualice la interfaz con el nuevo cambio
  imprimirTareas();
}


//---------------------------------------------------------------------------------------------
//función para imprimir las tareas en la interfaz
function imprimirTareas() {
  //capturo las tareas almacenadas
  if(localStorage.getItem('tareas') === null){
    //como no hay, creo un arreglo, en su primera posición inserto la tarea capturada, y guardo el arreglo de una posición
    var tarea = {
      titulo: "Friday Test",
      descripcion: "I need to study the equations very carefully in order to learn well"
    };
    let tareasAlmacenadas = [];
    tareasAlmacenadas.push(tarea);
    localStorage.setItem('tareas',JSON.stringify(tareasAlmacenadas));
  }
  else{
    let tareasAlmacenadas = JSON.parse(localStorage.getItem('tareas'));
    document.getElementById('listaTareas').innerHTML="";

    //por cada una de las tareas voy a hacer un proceso específico
    tareasAlmacenadas.forEach((item, i) => {
      //capturo los atributos de cada tarea (titulo y descripcion) y los guardo en variables
      var tituloAuxiliar=item.titulo;
      var descripcionAuxiliar=item.descripcion;

      //escribo el html correspondiente a la impresión de cada tarea, en resumen, se crea el texto con la info de la tarea y un botón de eliminar, al cual se le relacionó una función para cuando se le oprima con un click
      document.getElementById('listaTareas').innerHTML +=
      `<div class="tarea-item">
          <div class="tarea-item-info">
            <h5>${tituloAuxiliar}: ${descripcionAuxiliar}</h5>
          </div>
          <div class="tarea-item-boton">
            <button class="botonEliminar" id="botonEliminar" type="button" name="button" onclick="eliminarTarea(${i})">Eliminar</button>
          </div>
      </div>
      `;
    });
  }
}
//=============================================================================================
