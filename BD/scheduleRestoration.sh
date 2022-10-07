#!/bin/bash

# Ruta del archvo .env
ruta=$(pwd)
ruta2=${ruta/BD/.env}

# Extraemos valores especificios del archivo .env
function recortar(){
    var=$(cat $ruta2 | grep $1)
    var2="${var#*\'}"
    var3="${var2/\',/}"
    echo $var3
}

#Datos necesarios para el respaldo
user=$(recortar USER)
password=$(recortar PASSWORD)
host=$(recortar HOST)
dbName=$(recortar DATABASE)

# Otras opciones
backup_path=$1
date=$(date +"%d-%b-%Y")
 
credenciales=($user $password $host $dbName $backup_path $date)

longitudArray=${#credenciales[@]}

if [ $longitudArray -eq 6 ]
then
    echo "No falta ningun parametro"
    #echo "@monthly mysqldump --user=$user --password=$password --host=$host $db_name > $backup_path/$db_name-$date.sql" >> /usr/bin/crontab
else
    echo "ERROR: Faltan argumentos en su variable de entorno o al ejecutar este archivo"
fi



