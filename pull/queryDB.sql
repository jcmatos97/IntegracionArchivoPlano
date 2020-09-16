create database integracion_nomina
go
use integracion_nomina
go
create table nomina(
	id int primary key identity(1,1),
	fecha date
)
go
create table encabezado(
	id int primary key identity(1,1),
	codigoEntidad varchar(3),
	idNomina integer foreign key references nomina(id)
)
go
create table detalle(
	id int primary key identity(1,1),
	nombre varchar(60),
	cedula varchar(11),
	tipoEmpleado varchar(1),
	ingresoBruto varchar(10),
	descuento varchar(10),
	ingresoNeto varchar(10),
	idNomina integer foreign key references nomina(id)
)
go
create table sumario(
	id int primary key identity(1,1),
	numeroRegistros integer,
	idNomina integer foreign key references nomina(id)
)

