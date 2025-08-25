# TradeMarkApp - Sistema de Gestión de Marcas

Sistema para la gestión de marcas comerciales desarrollado con Next.js (Frontend) y FastAPI (Backend).


## Requisitos Previos

- Node.js 18+ (para el frontend)
- Python 3.11+ (para el backend)
- SQLite (incluido en Python)

## Empezando

Para obtener una copia local del proyecto, ejecuta:

```bash
git clone https://github.com/Luuchoh/tradermark.git
cd tradermark
```

## Configuración del Backend

1. Navega al directorio del backend:
   ```bash
   cd trademark-server
   ```

2. Crea y activa un entorno virtual (recomendado):
   ```bash
   python -m venv venv

   # En Windows
   .\venv\Scripts\activate

   # En Linux/Mac: 
   source venv/bin/activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Variables de Entorno - Backend

   Crea un archivo `.env` en el directorio del backend con las siguientes variables:

   ```
   DATABASE_URL=sqlite:///db.sqlite3
   ```  

5. Inicia el servidor de desarrollo:
   ```bash
   fastapi dev app/main.py
   ```
   El servidor estará disponible en http://localhost:8000

## Configuración del Frontend

1. Navega al directorio del frontend:
   ```bash
   cd trademark-app
   ```

2. Instala las dependencias:
   ```bash
   yarn install
   # o
   pnpm install
   ```

3. Variables de Entorno - Frontend

   Crea un archivo `.env` en el directorio del backend con las siguientes variables:

   ```
   NEXT_PUBLIC_SERVER_HOST=http://127.0.0.1:8000
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   yarn dev
   # o
   pnpm dev
   ```
   La aplicación estará disponible en http://localhost:3000


## Poblar la Base de Datos

Se incluye un script para poblar la base de datos con marcas de ejemplo. `Ejecuta en otra terminal`:

```bash
# Desde el directorio trademark-server
python seed_database.py
```

## Estructura del Proyecto

- `trademark-app/` - Aplicación Next.js (Frontend)
- `trademark-server/` - API FastAPI (Backend)
- `scripts/` - Scripts de utilidad


## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
