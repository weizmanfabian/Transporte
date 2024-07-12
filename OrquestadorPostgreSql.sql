-- Tabla conductores
CREATE TABLE conductores (
    con_id SERIAL PRIMARY KEY,
    con_nombre VARCHAR(255) NOT NULL,
    con_apellido VARCHAR(255) NOT NULL,
    con_email VARCHAR(255),
    con_telefono VARCHAR(15)
);

-- Tabla titulares
CREATE TABLE titulares (
    tit_id SERIAL PRIMARY KEY,
    tit_nombre VARCHAR(255) NOT NULL,
    tit_apellido VARCHAR(255) NOT NULL,
    tit_email VARCHAR(255),
    tit_telefono VARCHAR(15)
);

-- Tabla vehiculos
CREATE TABLE vehiculos (
    veh_id SERIAL PRIMARY KEY,
    veh_nombre VARCHAR(255) NOT NULL,
    veh_marca VARCHAR(255) NOT NULL,
    veh_modelo INT NOT NULL,
    veh_numero_de_ruedas INT NOT NULL,
    veh_tipo_de_vehiculo VARCHAR(255) NOT NULL,
    CHECK (veh_tipo_de_vehiculo IN (
        'CAMIONES_DE_CARGA_Y_REMOLQUES',
        'CAMIONES_DE_REPARTO',
        'FURGONETAS_DE_CARGA'
    )),
    CHECK (veh_marca IN (
        'FORD',
        'VOLVO',
        'MERCEDES_BENZ'
    ))
);

-- Tabla manifiestos
CREATE TABLE manifiestos (
    man_id SERIAL PRIMARY KEY,
    man_titular_id INT NOT NULL,
    man_valor_del_viaje DECIMAL(18, 2) NOT NULL,
    man_vehiculo_id INT NOT NULL,
    man_conductor_id INT NOT NULL,
    man_fecha TIMESTAMP NOT NULL,
	man_remitente VARCHAR(255) NOT NULL,
	man_destinatario VARCHAR(255) NOT NULL,
    FOREIGN KEY (man_titular_id) REFERENCES titulares(tit_id),
    FOREIGN KEY (man_vehiculo_id) REFERENCES vehiculos(veh_id),
    FOREIGN KEY (man_conductor_id) REFERENCES conductores(con_id)
);


-- Tabla remesas
CREATE TABLE remesas (
    rem_id SERIAL PRIMARY KEY,
    rem_tipo_de_mercancia VARCHAR(255) NOT NULL,
    rem_caracteristicas VARCHAR(1000),
    rem_peso DECIMAL(18, 2) NOT NULL,
    rem_unidad_de_medida VARCHAR(255) NOT NULL,
    rem_volumen VARCHAR(50) NOT NULL,
    rem_empaque VARCHAR(255) NOT NULL,
    rem_manifiesto_id INT,
    FOREIGN KEY (rem_manifiesto_id) REFERENCES manifiestos(man_id),
    CHECK (rem_unidad_de_medida IN (
        'KILOGRAMO',
        'ARROBA',
        'TONELADA',
        'LIBRA',
        'ONZA',
        'GRAMO'
    ))
);

-- Una vez una remesa ha sido asociada a un manifiesto no puede ser asociada a otro
ALTER TABLE remesas ADD CONSTRAINT unique_rem_manifiesto_id UNIQUE (rem_manifiesto_id, rem_id);

------------------------------ INSERT'S ----------------------

-- Insertar registros en conductores
INSERT INTO conductores (con_nombre, con_apellido, con_email, con_telefono)
VALUES 
('Juan', 'Pérez', 'juan.perez@example.com', '123456789'),
('María', 'González', 'maria.gonzalez@example.com', '987654321'),
('Carlos', 'Sánchez', 'carlos.sanchez@example.com', '555555555');

-- Insertar registros en titulares
INSERT INTO titulares (tit_nombre, tit_apellido, tit_email, tit_telefono)
VALUES 
('Empresa A', 'Logística', 'empresaA@example.com', '111222333'),
('Empresa B', 'Transportes', 'empresaB@example.com', '444555666'),
('Empresa C', 'Cargas', 'empresaC@example.com', '777888999');

-- Insertar registros en vehiculos
INSERT INTO vehiculos (veh_nombre, veh_marca, veh_modelo, veh_numero_de_ruedas, veh_tipo_de_vehiculo)
VALUES 
('Camión 1', 'FORD', 2015, 6, 'CAMIONES_DE_CARGA_Y_REMOLQUES'),
('Camión 2', 'VOLVO', 2018, 8, 'CAMIONES_DE_REPARTO'),
('Camión 3', 'MERCEDES_BENZ', 2020, 4, 'FURGONETAS_DE_CARGA');

-- Insertar registros en manifiestos
INSERT INTO manifiestos (man_titular_id, man_valor_del_viaje, man_vehiculo_id, man_conductor_id, man_fecha, man_remitente, man_destinatario)
VALUES 
(1, 500.00, 1, 1, '2024-07-09 10:00:00', 'Empresa A', 'Empresa B'),
(2, 750.00, 2, 2, '2024-07-10 11:00:00', 'Empresa A', 'Empresa B');

-- Insertar registros en remesas
INSERT INTO remesas (rem_tipo_de_mercancia, rem_caracteristicas, rem_peso, rem_volumen, rem_empaque, rem_manifiesto_id, rem_unidad_de_medida)
VALUES 
('Electrónica', 'Televisores y computadoras', 150.00, '2m3', 'Caja', 1, 'KILOGRAMO'),
('Ropa', 'Cajas de ropa', 200.00, '3m3', 'Caja', 1, 'KILOGRAMO'),
('Muebles', 'Sillas y mesas', 300.00, '5m3', 'Pallet', 2, 'KILOGRAMO'),
('Alimentos', 'Cajas de alimentos no perecederos', 400.00, '6m3', 'Caja', 2, 'KILOGRAMO');

