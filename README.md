# JsEntregaFinal
¿Como funciona la página?
* Al ingresar 
- El valor del Dolar Oficial banco Nación es tomado de la API de DolarSi ( ver función obtieneDolarOficialDeDolarSi() )
- Los tipos de impuestos y tipos de Dolares que se pintan son tomados a traves de un fetch de un json local. 
- El Storage se actualiza con esta información. 

* Se puede cambiar el valor de la cotización a mano y la página recalcula el precio del dolar. Se modifica el DOM para informar que valor es el que se está mostrando. 

* Todo lo existente puede ser eliminado. A la vez pueden crearse nuevos tipos de impuesto y nuevos tipos de dolares. Todo se actualiza en el Storage.

* Al recargar vuelve a la configuración inicial. 

--- Para probar el funcionamiento desde cero luego de limpiar Storage ---
PASO 1: Crear Impuestos que se van a aplicar sobre el valor del Dolar Banco Nación desde la opcion. Al 12/04/2023 en Argentina algunos de estos son: 
- PAIS: %30
- Adelanto de Impuesto a las Ganancias: %35 
- Adelanto de Impuesto a las Ganancias: %45
- Adelanto de de Impuesto de Bienes Personales: %25

PASO 2: Crear los tipos de Dolares existentes. Algunos ejemplos de estos son:
- Dolar Solidario: se aplican impuesto PAIS y 35% de Adelanto de Ganancias
- Dolar Netflix: se aplican impuesto PAIS y 45% de Adelanto de Ganancias
- Dolar Qatar: se aplican impuesto PAIS, 45% de Adelanto de Ganancias y 25% de Adelanto de BienesPersonales.

