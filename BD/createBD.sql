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

INSERT INTO Equipo (nombreEquipo)
VALUES ('Arsenal');

INSERT INTO Jugador (nombreJugador, idEquipo)
VALUES ('Gabriel Jesus' , 1);
