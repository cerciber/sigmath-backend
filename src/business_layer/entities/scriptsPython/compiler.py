
# Modulos importados
import sys
import traceback
from sys import platform

# Función para ejecutar el codigo python
def my_exec(cmd, globals=globals(), locals=None, description='source string'):
    # Intentar ejecutar el codigo
    try:
        exec(cmd, globals, locals)

    # Si hubo un error de sintaxis
    except SyntaxError as err:
        error_class = err.__class__.__name__
        detail = err.args[0]
        line_number = err.lineno

    # Si hubo otro error
    except Exception as err:
        error_class = err.__class__.__name__
        detail = err.args[0]
        cl, exc, tb = sys.exc_info()
        line_number = traceback.extract_tb(tb)[-1][1]

    # Si se terminó correctamente
    else:
        return

    # Imprimir errores detectados
    print("%s at line %d of %s: %s" %
          (error_class, line_number, description, detail))

# Ejecutar función según el entorno
if platform != "linux":
    my_exec(sys.argv[1].replace("\\n", "\n"))
else:
    my_exec(sys.argv[1])
