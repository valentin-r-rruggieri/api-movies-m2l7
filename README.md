# API Movies M2L7

Proyecto final de la clase M2L7: documentacion de APIs y preparacion para deploy.

Esta API administra peliculas favoritas usando Node.js, Express y PostgreSQL. La carpeta parte del proyecto terminado de M2L6, por eso ya incluye validaciones, manejo centralizado de errores y tests automaticos. En M2L7 se agregan documentacion OpenAPI, Swagger UI y configuracion lista para desplegar en Railway.

## De que trata esta clase

La lecture M2L7 trabaja dos temas principales:

- Documentar una API REST con OpenAPI.
- Preparar una API Express con PostgreSQL para deploy en Railway.

La idea es que el proyecto deje de ser solo una API local y pase a estar listo para compartir con otros desarrolladores:

```text
API Express -> OpenAPI -> Swagger UI -> GitHub -> Railway -> URL publica
```

## Que se construyo

Este proyecto incluye todo lo de M2L6 y suma:

- Archivo `openapi.yaml`.
- Swagger UI servido desde `/api-docs`.
- Spec OpenAPI servida desde `/openapi.yaml`.
- Ruta inicial con links a endpoints y documentacion.
- Soporte para `DATABASE_URL` en Railway.
- Soporte para variables locales `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
- README preparado para que el proyecto se pueda subir a GitHub y desplegar.
- Tests que verifican tambien `/api-docs` y `/openapi.yaml`.

## Stack

- Node.js
- Express
- PostgreSQL
- pg
- OpenAPI 3.1.1
- Swagger UI
- yamljs
- Vitest
- Supertest
- Railway

## Orden recomendado para explicar la carpeta

1. `app.js`: monta rutas, Swagger UI y middlewares.
2. `openapi.yaml`: documenta endpoints, parametros, cuerpos y respuestas.
3. `db/config.js`: permite conexion local o conexion con `DATABASE_URL`.
4. `server.js`: levanta la API en el puerto local o el puerto asignado por Railway.
5. `routes/movies.js`: CRUD de peliculas.
6. `validators/`: reglas de validacion heredadas de M2L6.
7. `middlewares/`: manejo centralizado de errores.
8. `tests/`: pruebas automaticas del proyecto.
9. `README.md`: guia de uso, repo y deploy.

## Estructura del proyecto

```text
api-movies-m2l7/
|-- app.js
|-- server.js
|-- openapi.yaml
|-- db/
|   |-- config.js
|   |-- setup.sql
|   `-- test-connection.js
|-- errors/
|   `-- createError.js
|-- middlewares/
|   |-- errorHandler.js
|   `-- notFoundHandler.js
|-- routes/
|   `-- movies.js
|-- validators/
|   `-- movieValidator.js
|-- tests/
|   |-- createError.test.mjs
|   |-- movieValidator.test.mjs
|   `-- movies.routes.test.mjs
|-- .env.example
|-- .gitignore
|-- package.json
`-- package-lock.json
```

## Endpoints disponibles

```text
GET    /
GET    /openapi.yaml
GET    /api-docs
GET    /api/movies
GET    /api/movies/:id
POST   /api/movies
PUT    /api/movies/:id
DELETE /api/movies/:id
```

## Documentacion OpenAPI

El archivo `openapi.yaml` describe:

- Informacion general de la API.
- Servidor local.
- Servidor de produccion.
- Endpoints disponibles.
- Parametros de ruta.
- Body requerido para `POST`.
- Body permitido para `PUT`.
- Schemas de respuesta.
- Errores `400`, `404` y `500`.

Swagger UI lee ese archivo y genera una pagina interactiva para ver y probar endpoints desde el navegador.

## Instalacion local

Entrar a la carpeta:

```bash
cd api-movies-m2l7
```

Instalar dependencias:

```bash
npm install
```

## Variables de entorno locales

Crear un archivo `.env` en la raiz del proyecto con este contenido:

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movies_db
DB_USER=movies_user
DB_PASSWORD=movies_pass_2026
PORT=3000
```

El archivo `.env` no se sube al repositorio.

## Preparar PostgreSQL local

Entrar a PostgreSQL como usuario administrador:

```bash
psql -U postgres
```

Crear base, usuario y permisos:

```sql
CREATE DATABASE movies_db;
CREATE USER movies_user WITH PASSWORD 'movies_pass_2026';
\c movies_db
GRANT ALL PRIVILEGES ON DATABASE movies_db TO movies_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO movies_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO movies_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO movies_user;
\q
```

Crear tabla e insertar datos iniciales:

```bash
psql -U movies_user -d movies_db -f db/setup.sql
```

Probar conexion:

```bash
npm run test:db
```

## Ejecutar localmente

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

## Probar en navegador

Ruta inicial:

```text
http://localhost:3000
```

Documentacion Swagger:

```text
http://localhost:3000/api-docs
```

Spec OpenAPI:

```text
http://localhost:3000/openapi.yaml
```

## Probar con curl

Ruta inicial:

```bash
curl http://localhost:3000/
```

Listar peliculas:

```bash
curl http://localhost:3000/api/movies
```

Obtener una pelicula:

```bash
curl http://localhost:3000/api/movies/1
```

Crear una pelicula:

```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Interstellar","director":"Christopher Nolan","year":2014,"genre":"Sci-Fi","rating":8.6}'
```

Actualizar una pelicula:

```bash
curl -X PUT http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"rating":9.0}'
```

Eliminar una pelicula:

```bash
curl -X DELETE http://localhost:3000/api/movies/1
```

Ver spec OpenAPI desde terminal:

```bash
curl http://localhost:3000/openapi.yaml
```

## Tests automaticos

Ejecutar todos los tests:

```bash
npm test
```

Ejecutar tests en modo watch:

```bash
npm run test:watch
```

Ejecutar tests con coverage:

```bash
npm run test:coverage
```

Resultado esperado:

```text
Test Files  3 passed
Tests       27 passed
```

## Preparar GitHub

Desde la carpeta `api-movies-m2l7`:

```bash
git init
git add .
git commit -m "Proyecto final M2L7"
git branch -M main
git remote add origin https://github.com/tu-usuario/api-movies-m2l7.git
git push -u origin main
```

No subir:

- `.env`
- `node_modules/`
- `coverage/`

Estos archivos ya estan contemplados en `.gitignore`.

## Preparar Railway

1. Crear una cuenta o iniciar sesion en Railway.
2. Crear un nuevo proyecto.
3. Agregar un servicio PostgreSQL.
4. Esperar a que Railway cree la base.
5. Ir al servicio PostgreSQL y copiar la URL publica de conexion.
6. Ejecutar `db/setup.sql` contra la base de Railway desde la terminal local.
7. Agregar el repo de GitHub como servicio Express.
8. Configurar variables de entorno.
9. Generar dominio publico.
10. Probar la URL publica.

## Ejecutar setup.sql en Railway

Usar la URL publica de PostgreSQL que entrega Railway:

```bash
psql postgresql://USUARIO:PASSWORD@HOST:PUERTO/railway -f db/setup.sql
```

Verificar tablas:

```bash
psql postgresql://USUARIO:PASSWORD@HOST:PUERTO/railway
```

Dentro de `psql`:

```sql
\dt
SELECT * FROM movies;
\q
```

## Variables en Railway

En el servicio Express de Railway agregar:

```text
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Si el servicio PostgreSQL se llama `postgres`, usar:

```text
DATABASE_URL=${{postgres.DATABASE_URL}}
```

Railway distingue mayusculas y minusculas en el nombre del servicio.

## Por que db/config.js sirve local y en Railway

En local se usan estas variables:

```text
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

En Railway se usa:

```text
DATABASE_URL
```

Si `DATABASE_URL` existe, la API usa esa cadena de conexion. Si no existe, usa las variables locales.

## Verificar deploy

Cuando Railway termine el deployment, generar un dominio publico desde:

```text
Settings > Networking > Generate Domain
```

Probar la API reemplazando `TU-DOMINIO-RAILWAY`:

```bash
curl https://TU-DOMINIO-RAILWAY/
curl https://TU-DOMINIO-RAILWAY/api/movies
curl https://TU-DOMINIO-RAILWAY/openapi.yaml
```

Abrir Swagger UI:

```text
https://TU-DOMINIO-RAILWAY/api-docs
```

## Verificar persistencia en produccion

Crear una pelicula:

```bash
curl -X POST https://TU-DOMINIO-RAILWAY/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"The Matrix","director":"Lana Wachowski, Lilly Wachowski","year":1999,"genre":"Sci-Fi","rating":8.7}'
```

Listar peliculas:

```bash
curl https://TU-DOMINIO-RAILWAY/api/movies
```

Reiniciar el servicio Express en Railway y volver a listar:

```bash
curl https://TU-DOMINIO-RAILWAY/api/movies
```

Si la pelicula sigue apareciendo, la API esta conectada a PostgreSQL en Railway y la persistencia funciona.

## Troubleshooting

Error `ENOENT: no such file or directory, open '.env'`

Revisar que exista `NODE_ENV=production` en Railway.

Error `getaddrinfo ENOTFOUND`

Revisar que `DATABASE_URL=${{Postgres.DATABASE_URL}}` use exactamente el mismo nombre del servicio PostgreSQL.

Error `502 Bad Gateway`

Revisar logs del servicio Express y confirmar que `server.js` usa `process.env.PORT || 3000`.

Respuesta vacia o error al consultar peliculas

Revisar que `db/setup.sql` se haya ejecutado en la base de Railway y que `DATABASE_URL` este configurada.
