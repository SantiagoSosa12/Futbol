#!/bin/bash

# Ruta del archvo .env
ruta=$(pwd)
ruta2=${ruta/BD/.env}

function recortar(){
    var=$(cat $ruta2 | grep $1)
    var2="${var#*\'}"
    var3="${var2/\'}"
    echo $var3
}

user=$(recortar USER)
password=$(recortar PASSWORD)
dbName=$(recortar DATABASE)

#otras opciones

backup_path=$1
userName=$(whoami)

credenciales=($user $password $dbName $backup_path $userName)
longitudArray=${#credenciales[@]}

if [ $longitudArray -eq 5 ]
then
    echo "@monthly $userName mysqldump --user=$user --password=$password $dbName > $backup_path/$dbName\`date \"+\%d-\%b-\%Y\"\`.sql" >> /etc/crontab
    echo "El backup se realizara mensualmente para el usuario: $user en la base de datos: $dbName"
else
    echo "ERROR: Faltan argumentos en su variable de entorno o al ejecutar este archivo"
fi