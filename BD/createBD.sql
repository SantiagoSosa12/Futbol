CREATE TABLE Equipo (
    id int NOT NULL AUTO_INCREMENT,
    nombreEquipo varchar (255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Jugador (
    id int NOT NULL AUTO_INCREMENT,
    nombreJugador varchar (255) NOT NULL,
    idEquipo int NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT pk_equipo_jugador FOREIGN KEY (idEquipo) REFERENCES Equipo(id)
);

CREATE TABLE Usuario (
    nombreUsuario varchar (255) NOT NULL,
    password varchar (255) NOT NULL
);

INSERT INTO Usuario(nombreUsuario, password)
VALUES ('Jose' , MD5('pktgd25'));

INSERT INTO Equipo (nombreEquipo)
VALUES ('Arsenal');

INSERT INTO Jugador (nombreJugador, idEquipo)
VALUES ('Gabriel Jesus' , 1);


/*
Calcula una suma de comprobación MD5 de 128 bits para la cadena. El valor se devuelve como una cadena de 32 dígitos hexadecimales, o NULLsi el argumento fuera NULL. El valor de retorno puede, por ejemplo, ser utilizado como clave hash. Véanse las notas al principio de este sección sobre el almacenamiento de valores hash de manera eficiente.

El valor de retorno es una cadena en el conjunto de caracteres de conexión.

Si el modo FIPS está habilitado, MD5()devoluciones NULL. Consulte la Sección 6.8, “Compatibilidad con FIPS” . 

*/