1. Documentos de los cuatro casos

¿Cuál es el número de la orden estándar, de la orden NFM, del plan de entregas y del plan de entregas NFM que vas a firmar? Los usamos para probar cada caso con el documento que tú validas.

2. Varias facturas en la misma posición

El monitor sigue con una línea por orden y posición. Cuando esa posición tiene varias facturas (LIFEX), mostramos la menor. En el plan 5500000003 las facturas van de 66572 a 67775. ¿Confirmas que en la pantalla debe aparecer 66572?

3. Entrega que ya no está en status A

Toda entrega con LIKP-WBSTK distinto de A queda fuera del monitor. La posición de la orden también sale de la lista. Por eso el 5500000003 ya no aparece. ¿Confirmas que esa posición debe desaparecer, y no quedarse visible con las columnas del ASN vacías?

4. Precio ASN y la ZASN

Si la orden y la posición existen en la ZASN, el Precio ASN de la pantalla es el precio unitario vigente de la ZASN, aunque ese valor sea cero. El precio del Excel solo se usa cuando no hay registro en la ZASN. ¿Confirmas esta prioridad?

5. Cinco decimales en la pantalla y dos en la orden

La pantalla muestra los precios con cinco decimales. En una orden en USD, el precio neto y la condición PBXX solo guardan dos. El Precio NFM 0,18080 se graba en la orden como 0,18. ¿Aceptas que la orden quede con dos decimales y la pantalla con cinco?

6. Precio NFM cuando la unidad de precio es distinta de la unidad base

La fórmula de la pantalla solo calcula cuando EKPO-BPRME es igual a EKPO-LMEIN. Si las unidades son distintas, el Precio NFM de la lista queda en 0. La conversión con MD_CONVERT_MATERIAL_UNIT ocurre al ejecutar Autorizar Precio ASN. ¿Confirmas que, en ese caso, la lista puede mostrar 0 y el valor convertido solo entra en la orden al autorizar?
