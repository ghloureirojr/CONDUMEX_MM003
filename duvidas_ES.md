1. Precio unitario vigente del pedido 5500000017, posición 10

En el correo el origen es ZASN-EXTENDED_AMT, una sola línea, sin repetir. En la respuesta el precio de la posición es la suma y el ejemplo da 6.000 USD para 60 PI. En la ZASN de ese material (10763397) las tres cuentas salen distintas:

un solo EXTENDED_AMT = 100
suma de EXTENDED_AMT = 600
precio unitario 100 × 60 PI = 6.000
¿Cuál de los tres debe mostrar la columna? Lo necesitamos porque cada uno cambia el valor que el monitor compara con el precio de la orden.

2. Cantidad de esos 60 PI

En el archivo, la primera cantidad (LFIMG) de esas 6 líneas suma 600. La segunda cantidad suma 60 (10 × 6). El ejemplo usa 60. ¿La cantidad de la factura es LFIMG o la segunda cantidad? Lo necesitamos porque la suma que ya está en la vista usa LFIMG y no reproduce el 60 del ejemplo.

3. Factura / Remisión cuando hay varias LIFEX

El monitor tiene una línea por orden y posición. En el plan 5500000003 hay 14 líneas y las facturas van de 66572 a 67775. La 66572 está en dos entregas. ¿El monitor sigue en una línea por posición o pasa a una línea por cada LIFEX? Si sigue en una línea, ¿qué factura mostramos? Lo necesitamos porque la clave de la aplicación es orden + posición. Una línea por factura cambia el log y la autorización.

4. Entrega que ya no está en status A

LIKP-WBSTK = A ya filtra los datos de la ZASN. ¿La posición de la orden sigue visible en el monitor, con las columnas del ASN vacías, o esa posición desaparece de la lista? Lo necesitamos porque hoy la posición permanece.

5. Precio NFM: solo pantalla o también la orden

La fórmula quedó así: cantidad recibida, convertida a la unidad base, × (NKU / BMG × VGW / VMG). ¿Ese resultado solo se muestra, o sustituye la cotización de la OICQP que Autorizar Precio graba en la orden? En el pedido 4500000145 la autorización ya grabó la cotización 455,00. Lo necesitamos para no cambiar un proceso que ya fue probado.

6. VMG y los decimales del ejemplo

En /NFM/TORDERPOS el campo es VGE, no VMG. Los factores del ejemplo, 12,985 y 0,0032038, no salen de las tasas grabadas en los pedidos de prueba, y el resultado tiene 8 decimales. El correo pide 5. ¿VMG es VGE? ¿De qué campos salen 12,985 y 0,0032038? ¿La pantalla muestra 5 o 8 decimales? Lo necesitamos para escribir la fórmula con los campos reales.

7. Unidades de la conversión

El correo original convierte cuando EKPO-BPRME es distinta de EKPO-LMEIN. La respuesta convierte la cantidad recibida de ZASN-VRKME a MARA-MEINS con MD_CONVERT_MATERIAL_UNIT. En varias líneas de la ZASN la unidad llegó como ******. ¿La conversión es de VRKME hacia MARA-MEINS, y qué hacemos cuando VRKME viene vacío? Lo necesitamos porque sin la unidad de origen la función no convierte.

8. Documentos de los cuatro casos

¿Cuál es el número de la orden estándar, de la orden NFM, del plan de entregas y del plan de entregas NFM? Lo necesitamos para probar cada caso con el documento que usted va a firmar, y no con un pedido que solo tenga datos parecidos.
