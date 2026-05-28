# TrackerBot Gaming

Panel web para monitorizar el precio de tres juegos en Instant Gaming y recibir alertas por Telegram cuando el precio baja.

## Características

- Scraping vía proxies públicas con `fetch()`.
- DOMParser para convertir el HTML en DOM navegable.
- Extracción de datos: título, precio, imagen, descuento.
- Dashboard profesional con tarjetas, historial y estado en tiempo real.
- Monitorización automática cada 2 minutos (120000 ms).
- Detección de cambios con `localStorage`.
- Alertas por Telegram utilizando Bot API.

## Cómo usar

1. Abre `index.html` en tu navegador o sirve la carpeta de forma local.
2. Introduce tu `Bot Token` y `Chat ID` en la sección de Telegram.
3. Haz clic en `Guardar configuración`.
4. Pulsa `Probar Telegram` para verificar que el bot y el chat funcionan.
5. Pulsa `Iniciar Monitorización`.
6. Cuando el precio baje, recibirás un mensaje en Telegram.

## Uso en clase

- Usa `Probar Telegram` para demostrar que la conexión funciona.
- Usa `Simular alerta` para mostrar una notificación de Telegram durante la presentación sin esperar a un cambio real de precio.
- El dashboard muestra historial, estado de Telegram y tarjetas de cada juego.

## Juegos monitorizados

- FIFA 26
- GTA V
- Call of Duty: Black Ops

## Fases del proyecto

- **Fase 1** – Motor de Scraping: fetch + proxy + DOMParser.
- **Fase 2** – Dashboard: tarjetas visuales, botones de inicio/detención y estado.
- **Fase 3** – Detección de cambios: comparación con `localStorage`.
- **Fase 4** – Telegram: notificaciones directas al móvil.

## Configuración Telegram

1. Crea un bot con BotFather.
2. Copia el `TOKEN` del bot.
3. Obtén tu `CHAT_ID` usando `https://api.telegram.org/bot<TOKEN>/getUpdates` o `@userinfobot`.
4. Introduce esos datos en el formulario y guarda.

## Notas técnicas

- El proyecto utiliza solo HTML, CSS y JavaScript puro.
- Los datos se mantienen en `localStorage` para persistir precios y alertas.
- Si Telegram no está configurado, el dashboard seguirá monitorizando sin enviar mensajes.
- Usa el botón "Descargar instantánea" para guardar un snapshot JSON del estado actual.

## Servir localmente

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor:

```bash
npm start
```

3. Abre `http://localhost:3000` en tu navegador.

La ruta `/save` permite guardar instantáneas JSON en el directorio `indexes/`.

## Recomendaciones

- Usa el navegador en modo de desarrollador para ver el historial y errores.
- Asegúrate de que los proxies públicos estén disponibles.
- Si el sitio cambia su estructura, ajusta los selectores de scraping en `script.js`.

## Git

Este proyecto está pensado para trabajar con control de versiones. En tu repositorio deberías hacer commits como:

- `Fase 1: Implementado fetch y DOMParser.`
- `Fase 2: Añadido dashboard y tarjetas visuales.`
- `Fase 3: Guardado de precios en localStorage.`
- `Fase 4: Integrada API de Telegram.`

