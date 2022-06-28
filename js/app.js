const $dia = document.querySelectorAll('.barra__dia')
const $gasto = document.querySelectorAll('.barra__gasto')
const $barra = document.querySelectorAll('.barra__progreso')

let nombre_dia = new Date().getDay()

const archivo = new XMLHttpRequest()
archivo.open('GET', './asset/json/data.json')
archivo.onreadystatechange = () => {
    if (archivo.readyState == 4 && archivo.status == 200) {
        const datos = JSON.parse(archivo.responseText)

        const cantidades = new Array
        datos.forEach(dato => {
            cantidades.push(dato.cantidad)
        });
        let mayor = Math.max(...cantidades)

        $dia.forEach((dia, i) => {
            dia.textContent = datos[i].dia
            $gasto[i].textContent = datos[i].cantidad
            $barra[i].style.height = `${(datos[i].cantidad * 100) / mayor}%`
            $gasto[i].style.bottom = `${(datos[i].cantidad * 100) / mayor}%`
            if (i == nombre_dia) {
                $barra[i].classList.add('barra__progreso--activo')
            }
        });
    }
}
archivo.send()
