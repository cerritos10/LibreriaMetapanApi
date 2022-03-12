CREATE DATABASE  libreriaMeta;

USE libreriaMeta;

CREATE TABLE roles(
    id_tipousuario INT NOT NULL AUTO_INCREMENT,
    rol varchar(45) NOT NULL,
    PRIMARY KEY (id_tipousuario)
);

CREATE TABLE usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nombre varchar(200)  NOT NULL,
    username varchar(45) NOT NULL,
    password varchar(100) NOT NULL,
    id_tipousuario INT NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_tipousuario) REFERENCES roles(id_tipousuario)
);

create table cliente (
	id_cliente INT NOT NULL AUTO_INCREMENT,
	nombre varchar(200) NOT NULL,
	telefono varchar(9) NOT NULL,
	sexo varchar (9) NOT NULL,
	primary key (id_cliente)
);

CREATE TABLE tipoVenta(
    id_tipoVenta INT NOT NULL AUTO_INCREMENT,
    nombre_tipo_venta varchar(100) NOT NULL,
    PRIMARY KEY (id_tipoVenta)
);

create table facturaVenta (
	id_factura_venta INT NOT NULL AUTO_INCREMENT,
	id_cliente int NOT NULL,
	id_usuario int NOT NULL,
	id_tipoVenta int NOT NULL,
	fecha_venta varchar(100) NOT NULL,
	primary key (id_factura_venta),
	foreign key (id_tipoVenta) references tipoVenta (id_tipoVenta), 
	foreign key (id_cliente) references cliente (id_cliente),
	foreign key (id_usuario) references usuarios (id_usuario)
);

CREATE TABLE categoria(
    id_categoria INT NOT NULL AUTO_INCREMENT,
    nombre_categoria varchar(100) NOT NULL,
    PRIMARY KEY (id_categoria)
);

create table marca (
	id_marca INT NOT NULL AUTO_INCREMENT,
	nombre_marca varchar(100) NOT NULL,
	primary key (id_marca)
);

create table producto (
	id_producto INT NOT NULL AUTO_INCREMENT,
	id_categoria int NOT NULL,
	id_marca int NOT NULL,
	nombre_producto varchar (100) NOT NULL,
	descripcion varchar (500) NOT NULL,
	stock int NOT NULL,
	precio_venta numeric (3,2) NOT NULL,
	precio_descuento numeric (3,2) NOT NULL,
	primary key (id_producto),
	foreign key (id_categoria) references categoria (id_categoria),
	foreign key (id_marca) references marca (id_marca)
);

create table detalleVenta (
	id_detalle_venta INT NOT NULL AUTO_INCREMENT,
	id_factura_venta int NOT NULL,
	id_producto int NOT NULL,
	cantidad int NOT NULL,
    total numeric (3,2) NOT NULL,
	primary key (id_detalle_venta),
	foreign key (id_producto) references producto (id_producto),
	foreign key (id_factura_venta) references facturaVenta (id_factura_venta)
);

CREATE TABLE proveedor(
    id_proveedor INT NOT NULL AUTO_INCREMENT,
    nombre varchar(100) NOT NULL,
    direccion varchar(200),
    telefono varchar(9) NOT NULL,
    PRIMARY KEY (id_proveedor)
);

CREATE TABLE tipoCompra(
    id_tipo_compra INT NOT NULL AUTO_INCREMENT,
    nombre_tipo_compra varchar(100) NOT NULL,
    PRIMARY KEY (id_tipo_compra)
);

create table compra (
	id_compra INT NOT NULL AUTO_INCREMENT,
	id_proveedor int NOT NULL,
	id_usuario int NOT NULL,
	id_tipo_compra int NOT NULL,
	fecha_compra varchar (100) NOT NULL,
	codigo varchar (6) NOT NULL,
	primary key (id_compra),
	foreign key (id_tipo_compra) references tipoCompra (id_tipo_compra),
	foreign key (id_proveedor) references proveedor (id_proveedor),
	foreign key (id_usuario) references usuarios (id_usuario)
);
create table detalleCompra (
 	id_detalle_compra serial,
	id_compra int,
	id_producto int,
	cantidad int,
	precio_compra numeric (3,2),
	primary key (id_detalle_compra),
	foreign key (id_producto) references producto (id_producto),
	foreign key (id_compra) references compra (id_compra)
);
