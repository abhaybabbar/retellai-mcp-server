

# RetellAI MCP Server

Esta es una implementación del servidor del Protocolo de Contexto de Modelos (MCP) para RetellAI, que permite a los asistentes de IA interactuar con los servicios de voz de RetellAI.

## Características

El servidor MCP de RetellAI proporciona herramientas para:

- **Gestión de llamadas**: Crear y gestionar llamadas telefónicas y llamadas web
- **Gestión de agentes**: Crear y gestionar agentes de voz con diferentes configuraciones de LLM
- **Gestión de números telefónicos**: Provisionar y configurar números telefónicos
- **Gestión de voces**: Acceder y utilizar diferentes opciones de voz

## Configuración en Claude Desktop

1. Abre `Claude Desktop` y presiona `CMD + ,` para ir a `Settings`.
2. Haz clic en la pestaña `Developer`.
3. Haz clic en el botón `Edit Config`.
4. Esto abrirá el archivo `claude_desktop_config.json` en tu explorador de archivos.
5. Obtén tu clave API de Retell desde el panel de control de Retell (<https://dashboard.retellai.com/apiKey>).
6. Agrega lo siguiente a tu archivo `claude_desktop_config.json`. Consulta [aquí](https://modelcontextprotocol.io/quickstart/user) para más detalles.
7. Reinicia Claude Desktop después de editar el archivo de configuración.

```json
{
  "mcpServers": {
    "retellai-mcp-server": {
      "command": "npx",
      "args": ["-y", "@abhaybabbar/retellai-mcp-server"],
      "env": {
        "RETELL_API_KEY": "<your_retellai_token>"
      }
    }
  }
}
```

### Solución de problemas: "No tools available"

Si Claude Desktop muestra el servidor pero no las herramientas, actualiza a la última versión del paquete:

```bash
npx -y @abhaybabbar/retellai-mcp-server@latest
```

Este problema suele deberse a una incompatibilidad de dependencias o versiones en instalaciones anteriores.

## Casos de uso de ejemplo:

1. Listar todos los números que tengo en RetellAI
2. Listar todos los agentes que tengo
3. Dime más sobre el agente de entrega de pizza
4. Ejemplo de creación de agente y llamada:
   1. Crea un agente que llame a mi pizzería local, asegúrate de mantener la conversación breve y directa.
   2. Pide una pizza margarita
   3. El pago será en efectivo contra entrega
   4. Envíala a <address>
   5. El agente debe fingir ser yo. Mi nombre es <your_name>
   6. Realiza una llamada saliente a mi pizzería local al <phone_number>, utilizando el número de EE. UU.

## Configuración del repositorio

1. Instala las dependencias:

   ```bash
   npm i
   ```

2. Crea un archivo `.env` con tu clave API de RetellAI:

   ```
   RETELL_API_KEY=your_api_key_here
   ```

3. Ejecuta el servidor:
   ```bash
   node src/retell/index.js
   ```

## Herramientas disponibles

### Herramientas de llamadas

- `list_calls`: Lista todas las llamadas de Retell
- `create_phone_call`: Crea una nueva llamada telefónica
- `create_web_call`: Crea una nueva llamada web
- `get_call`: Obtiene los detalles de una llamada específica
- `delete_call`: Elimina una llamada específica

### Herramientas de agentes

- `list_agents`: Lista todos los agentes de Retell
- `create_agent`: Crea un nuevo agente de Retell
- `get_agent`: Obtiene un agente de Retell por ID
- `update_agent`: Actualiza un agente de Retell existente
- `delete_agent`: Elimina un agente de Retell
- `get_agent_versions`: Obtiene todas las versiones de un agente de Retell

### Herramientas de números telefónicos

- `list_phone_numbers`: Lista todos los números telefónicos de Retell
- `create_phone_number`: Crea un nuevo número telefónico
- `get_phone_number`: Obtiene los detalles de un número telefónico específico
- `update_phone_number`: Actualiza un número telefónico
- `delete_phone_number`: Elimina un número telefónico

### Herramientas de voz

- `list_voices`: Lista todas las voces disponibles de Retell
- `get_voice`: Obtiene los detalles de una voz específica

## Licencia

MIT
