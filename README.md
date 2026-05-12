# API Movies M2L7

API REST de peliculas construida con Node.js, Express y PostgreSQL.

Esta carpeta representa el proyecto terminado de M2L7. Hereda la version robusta de M2L6 (validaciones, error handler y tests) y agrega documentacion OpenAPI con Swagger UI, soporte para `DATABASE_URL` y preparacion para deploy en Railway.

## URL base

Local:

```text
http://localhost:3000
```

Produccion Railway:

```text
https://api-movies-m2l7-production.up.railway.app
```

Reemplazar esa URL por el dominio real generado en Railway.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- pg
- OpenAPI 3.1.1
- Swagger UI
- Vitest
- Supertest
- Railway

## Estructura

```text
api-movies-m2l7/
|-- app.js
|-- server.js
|-- openapi.yaml
|-- db/
|-- errors/
|-- middlewares/
|-- routes/
|-- validators/
|-- tests/
|-- .env.example
|-- .gitignore
|-- package.json
`-- package-lock.json
```

## Endpoints

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

## Documentacion interactiva

Swagger UI queda disponible en:

```text
http://localhost:3000/api-docs
```

La especificacion OpenAPI queda disponible en:

```text
http://localhost:3000/openapi.yaml
```

En produccion:

```text
https://TU-DOMINIO-RAILWAY/api-docs
https://TU-DOMINIO-RAILWAY/openapi.yaml
```

## Instalacion local

```bash
npm install
```

Crear `.env` a partir de `.env.example`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movies_db
DB_USER=movies_user
DB_PASSWORD=movies_pass_2026
PORT=3000
```

## Base de datos local

Crear base y usuario:

```sql
CREATE DATABASE movies_db;
CREATE USER movies_user WITH PASSWORD 'movies_pass_2026';
\c movies_db
GRANT ALL PRIVILEGES ON DATABASE movies_db TO movies_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO movies_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO movies_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO movies_user;
```

Ejecutar el setup:

```bash
psql -U movies_user -d movies_db -f db/setup.sql
```

Probar conexion:

```bash
npm run test:db
```

## Ejecutar localmente

```bash
npm run dev
```

Probar la ruta principal:

```bash
curl http://localhost:3000/
```

Probar Swagger UI desde el navegador:

```text
http://localhost:3000/api-docs
```

## Ejemplos con curl

Obtener todas las peliculas:

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

Actualizar parcialmente:

```bash
curl -X PUT http://localhost:3000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"rating":9.0}'
```

Eliminar:

```bash
curl -X DELETE http://localhost:3000/api/movies/1
```

Ejemplo de error de validacion:

```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"","director":"Christopher Nolan"}'
```

## Tests

Los tests de endpoints usan un pool falso, por lo que no necesitan PostgreSQL.

```bash
npm test
```

Modo watch:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:coverage
```

## Preparar repo GitHub

Desde esta carpeta:

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

## Deploy en Railway

1. Crear un proyecto en Railway.
2. Agregar PostgreSQL.
3. Ejecutar `db/setup.sql` en la base de Railway usando la URL publica de conexion.
4. Crear un repo de GitHub con esta carpeta.
5. En Railway, agregar un servicio desde ese GitHub Repo.
6. Configurar variables en el servicio Express:

```text
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Si el servicio PostgreSQL se llama `postgres` en minuscula, usar:

```text
DATABASE_URL=${{postgres.DATABASE_URL}}
```

7. Verificar logs del deployment.
8. Generar dominio publico desde Settings > Networking > Generate Domain.
9. Probar endpoints con la URL real.

## Verificacion en produccion

Reemplazar `TU-DOMINIO-RAILWAY` por el dominio real:

```bash
curl https://TU-DOMINIO-RAILWAY/
curl https://TU-DOMINIO-RAILWAY/api/movies
curl https://TU-DOMINIO-RAILWAY/openapi.yaml
```

Abrir en navegador:

```text
https://TU-DOMINIO-RAILWAY/api-docs
```

Crear una pelicula y luego reiniciar el servicio en Railway. Si la pelicula sigue apareciendo en `GET /api/movies`, la API esta conectada a PostgreSQL y la persistencia funciona.
