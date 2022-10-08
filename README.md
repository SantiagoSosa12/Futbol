# API Futbol

API de jugadores y clubes especificamente de la Premier League

Para el proyecto instale las dependencias con el siguiente comando
```
npm install 
```

Para cargar la base de datos primero ingrese a la carpeta BD luego ejecute el siguiente comando
```
sudo mysql -u root -p <createBD.sql 
```
Para iniciar el programa ejecute el siguiente comando
```
npm run start
```

Para realizar las operaciones CRUD debera: 

- Obtener un *token* en la ruta: */login*
- Incluir un encabezado de *Autorizathion* con el token genrado en el paso anterior

La Base de datos hace un respaldo automatico cada mes
Para que esto suceda debera dirijirse a la carpeta BD dentro de este proyecto
y ejecutar el siguiente comando
```
sudo bash scheduleRestoration.sh DIRECTORIO_DE_RESPALDO
```