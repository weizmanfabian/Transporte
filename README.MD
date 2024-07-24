
# Operación de Transporte
https://github.com/user-attachments/assets/4f2f5c57-ae95-47ad-bba7-6fe3d8ffdfbe

Este proyecto interactua con una base de datos Postgres en contenedores Docker desde Java v17 y React v18

## Pasos para la ejecución del proyecto

### 1. Clonar el proyecto

```bash
git clone https://github.com/weizmanfabian/Transporte.git
```

### 1.1. Descargar y ejecutar la imagen de Docker para PostgreSql

```bash
docker run --name postgresOperacionDeTransporte -e POSTGRES_PASSWORD=YourStrong#Passw0rd -d -p 5434:5432 postgres
```

### 1.2. Verificar la ejecución del contenedor PostgreSql

```bash
docker ps
```

### 2. Conectarse a la base de datos PostgreSql

- **Host:** localhost
- **Username:** postgres
- **Password:** YourStrong#Passw0rd
- **Port:** 5434

### 3. Crear la base de datos en PostgreSql

```sql
CREATE DATABASE OperacionDeTransporte;
```

### 4. Ejecutar el script `OrquestadorPostgreSql` en la base de datos creada

Copia y pega todo el contenido del script `OrquestadorPostgreSql` y ejecútalo en la base de datos `OperacionDeTransporte`.

### 5. Navegar al directorio `Transporte/OperacionDeTransporte` y lo abrimos con un editor de java por ejemplo `IntelliJ`, lo compilamos y arrancamos el proyecto. `PORT 8084`

```bash
cd Transporte/OperacionDeTransporte
```

### 6. Navegar al directorio `Transporte/op-trans-front` y lo abrimos en una terminal

### 7. Instalar las dependencias del proyecto

```bash
npm install
```

### 8. Iniciar la aplicación

```bash
npm start
```

### 12. Importar la colección de Postman

Abre Postman e importa la colección `operacionDeTransporte.postman_collection`.

## Notas Adicionales

- Asegúrate de que Docker esté instalado y en funcionamiento en tu sistema.
- Los puertos utilizados (5434 para Postgres) debe estar disponible en tu máquina.
- Ajusta las contraseñas y configuraciones según tus necesidades de seguridad.
- El Servicio se expone en el puerto 8084
