# API Futbol

API de jugadores y clubes especificamente de la Premier League

Para aaceder a la base de datos recuerde crear su archivo .env 
a continuacion un ejemplo:

```
SECRET=ijyfk 
HOST='localhost'
USER='pedroPicapiedra'
PASSWORD='qwev56tgt'
DATABASE='futbol'
```

-----------------------

Para el proyecto instale las dependencias con el siguiente comando
```
npm install 
```

-----------------------

Para cargar la base de datos primero ingrese a la carpeta BD luego ejecute el siguiente comando
```
sudo mysql -u root -p <createBD.sql 
```
Para iniciar el programa ejecute el siguiente comando
```
npm run start
```

------------------------

Para realizar las operaciones CRUD debera: 

- Obtener un *token* en la ruta: */login*
- Incluir un encabezado de *Autorizathion* con el token genrado en el paso anterior

-------------------------

*******RECOMENDACIONES******


La Base de datos hace un respaldo automatico cada mes
Para que esto suceda debera dirijirse a la carpeta BD dentro de este proyecto
y ejecutar el siguiente comando
```
sudo bash scheduleRestoration.sh DIRECTORIO_DE_RESPALDO
```
Debera cambiar DIRECTORIO_DE_RESPALDO con la ruta de la carpeta,
del sirectorio donde quiere que queden guardadas sus copias de respaldo.


Para tener una Base de datos mas segura ejecute el siguiente comando:
```
sudo mysql_secure_installation
```

Si desea generar logs en su base de datos siga los pasos: 
https://gist.github.com/joseluisq/40ec9169669aa1848492141fa6f57fcb

