# Respuesta json de la ejecución del script python
string_as_response_8965 = ''

# Intentar tratar la respuesta como una expresión Sympy
try:
    # Convertir resultado de la función principal a Sympy
    parse_expr(str(result_value_from_main8965))

    # Si el resultado no tiene simbolos libres    
    if result_value_from_main8965.free_symbols == set():
        # Asignar lista vacia para los simbolos en string
        symbols_from_main8965 = "[]"

    # Si el resultado tiene simbolos libres    
    else:
        # Asignar lista con los parametros en string
        symbols_from_main89652 = result_value_from_main8965.free_symbols
        symbols_from_main8965 = []
        for symbol in symbols_from_main89652:
            symbols_from_main8965.append(str(symbol))

    # Obtener código LaTeX
    latex_from_main8965 = latex(result_value_from_main8965)

    # Asignar que el resultado es tratable con Sympy
    string_as_response_8965 = string_as_response_8965 + '{\'isSympy\' : true,'

# Si la respuesta no se puede tratar como una expresión Sympy
except:

    # Asignar lista vacia para los simbolos en string
    symbols_from_main8965 = "[]"

    # Obtener código LaTeX
    latex_from_main8965 = latex(result_value_from_main8965)

    # Asignar que el resultado no es tratable con Sympy
    string_as_response_8965 = string_as_response_8965 + '{\'isSympy\' : false,'

# Crear json de resultados de la ejecución del script python
string_as_response_8965 = string_as_response_8965 + '\'mainReturn\' : \'' + str(result_value_from_main8965)+\
                          '\','+'\'symbols\' : ' + str(symbols_from_main8965) + ','+'\'latex\' : \'' + \
                          str(latex_from_main8965) + '\'}'

# Imprimir Json en consola 
print('<<<<---output-->>>>>'+string_as_response_8965+'<<<<---output-->>>>>')

