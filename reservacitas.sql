-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema reservacitas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `reservacitas` ;

-- -----------------------------------------------------
-- Schema reservacitas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reservacitas` DEFAULT CHARACTER SET utf8mb3 ;
USE `reservacitas` ;

-- -----------------------------------------------------
-- Table `reservacitas`.`segurosmedicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`segurosmedicos` (
  `IdSeguroMedico` INT NOT NULL AUTO_INCREMENT,
  `NombreSeguro` ENUM('Assa', 'Adeslas', 'Allianz', 'Antares', 'Asisa', 'Avant') NOT NULL,
  `DescuentoSeguro` INT NOT NULL,
  PRIMARY KEY (`IdSeguroMedico`))
ENGINE = InnoDB
AUTO_INCREMENT =1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`pacientes` (
  `NombrePaciente` VARCHAR(45) NOT NULL,
  `ApellidoPaciente` VARCHAR(45) NOT NULL,
  `DNIPaciente` VARCHAR(9) NOT NULL,
  `DireccionPaciente` VARCHAR(45) NOT NULL,
  `MovilPaciente` INT NOT NULL,
  `IdSeguroMedico` INT NOT NULL,
  `CorreoPaciente` VARCHAR(45) NOT NULL,
  `PasswordPaciente` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`DNIPaciente`),
  INDEX `fk7_idx` (`IdSeguroMedico` ASC) VISIBLE,
  CONSTRAINT `fk7`
    FOREIGN KEY (`IdSeguroMedico`)
    REFERENCES `reservacitas`.`segurosmedicos` (`IdSeguroMedico`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`medicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`medicos` (
  `IdNumeroColegiado` INT NOT NULL,
  `NombreMedico` VARCHAR(45) NOT NULL,
  `ApellidoMedico` VARCHAR(45) NOT NULL,
  `Especialidad` ENUM('Pediatria', 'Medicina Interna', 'Medicina Familiar', 'Psicologia', 'Psiquiatria', 'Ginecologia', 'Traumatologia', 'Alergologia', 'Oftalmologia') NOT NULL,
  `Consulta` VARCHAR(45) NOT NULL,
  `DisponibilidadMedico` ENUM('Maniana', 'Tarde', 'Maniana y Tarde') NOT NULL,
  `CorreoMedico` VARCHAR(45) NOT NULL,
  `PasswordMedico` VARCHAR(300) NOT NULL,
  `Administrador` ENUM('Si', 'No') NOT NULL,
  PRIMARY KEY (`IdNumeroColegiado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`citas` (
  `IdCita` INT NOT NULL AUTO_INCREMENT,
  `DNIPaciente` VARCHAR(9) NULL DEFAULT NULL,
  `IdNumeroColegiado` INT NULL DEFAULT NULL,
  `Fecha` DATE NOT NULL,
  `Diagnostico` VARCHAR(1000) NULL DEFAULT NULL,
  `PrecioCita` DECIMAL(10,0) DEFAULT 50,
  `Hora` ENUM('9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '16:00', '17:00') NOT NULL,
  `EstadoCita` ENUM('Finalizada', 'En curso') NOT NULL,
  PRIMARY KEY (`IdCita`),
  INDEX `fk1_idx` (`DNIPaciente` ASC) VISIBLE,
  INDEX `fk2_idx` (`IdNumeroColegiado` ASC) VISIBLE,
  CONSTRAINT `fk1`
    FOREIGN KEY (`DNIPaciente`)
    REFERENCES `reservacitas`.`pacientes` (`DNIPaciente`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk2`
    FOREIGN KEY (`IdNumeroColegiado`)
    REFERENCES `reservacitas`.`medicos` (`IdNumeroColegiado`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`medicamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`medicamento` (
  `idMedicamento` INT NOT NULL AUTO_INCREMENT,
  `PagoMedicamento` INT NOT NULL,
  `NombreMedicamento` VARCHAR(45) NOT NULL,
  `TipoMedicamento` ENUM('Analgesicos', 'Antiacidosos y antiulcerosos', 'Antialergicos', 'Antidiarreicos', 'Laxantes', 'Antiinflamatorios', 'Antiinfecciosos', 'Antipireticos', 'Mucoliticos', 'Antitusivos') NOT NULL,
  PRIMARY KEY (`idMedicamento`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`recetasmedicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`recetasmedicas` (
  `idReceta` INT NOT NULL AUTO_INCREMENT,
  `Dosis` VARCHAR(45) NULL DEFAULT NULL,
  `InstruccionUso` VARCHAR(200) NULL DEFAULT NULL,
  `IdCita` INT NOT NULL,
  PRIMARY KEY (`idReceta`),
  INDEX `fk5_idx` (`IdCita` ASC) VISIBLE,
  CONSTRAINT `fk5`
    FOREIGN KEY (`IdCita`)
    REFERENCES `reservacitas`.`citas` (`IdCita`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`medicamento_has_recetasmedicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`medicamento_has_recetasmedicas` (
  `Medicamento_idMedicamento` INT NULL DEFAULT NULL,
  `RecetasMedicas_idReceta` INT NULL DEFAULT NULL,
  UNIQUE INDEX `UK_Medicamento_has_RecetasMedicas` (`Medicamento_idMedicamento` ASC, `RecetasMedicas_idReceta` ASC) VISIBLE,
  INDEX `fk_Medicamento_has_RecetasMedicas_RecetasMedicas1_idx` (`RecetasMedicas_idReceta` ASC) VISIBLE,
  INDEX `fk_Medicamento_has_RecetasMedicas_Medicamento1_idx` (`Medicamento_idMedicamento` ASC) VISIBLE,
  CONSTRAINT `fk_Medicamento_has_RecetasMedicas_Medicamento1`
    FOREIGN KEY (`Medicamento_idMedicamento`)
    REFERENCES `reservacitas`.`medicamento` (`idMedicamento`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Medicamento_has_RecetasMedicas_RecetasMedicas1`
    FOREIGN KEY (`RecetasMedicas_idReceta`)
    REFERENCES `reservacitas`.`recetasmedicas` (`idReceta`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`pagosfacturacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`pagosfacturacion` (
  `IdTransaccion` INT NOT NULL AUTO_INCREMENT,
  `IdCita` INT NOT NULL,
  `Fechapago` VARCHAR(45) NOT NULL,
  `Metodopago` ENUM('tarjeta', 'efectivo') NOT NULL,
  `IdSeguroMedico` INT NOT NULL,
  `PrecioTotal` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`IdTransaccion`),
  INDEX `fk8_idx` (`IdCita` ASC) VISIBLE,
  INDEX `fk9_idx` (`IdSeguroMedico` ASC) VISIBLE,
  CONSTRAINT `fk8`
    FOREIGN KEY (`IdCita`)
    REFERENCES `reservacitas`.`citas` (`IdCita`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk9`
    FOREIGN KEY (`IdSeguroMedico`)
    REFERENCES `reservacitas`.`segurosmedicos` (`IdSeguroMedico`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservacitas`.`reseniamedicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservacitas`.`reseniamedicos` (
  `idResenia` INT NOT NULL AUTO_INCREMENT,
  `IdNumeroColegiado` INT NULL DEFAULT NULL,
  `DNIPaciente` VARCHAR(45) NULL DEFAULT NULL,
  `Comentario` VARCHAR(300) NOT NULL,
  `FechaResenia` DATE NOT NULL,
  `Puntuacion` ENUM('1', '2', '3', '4', '5') NOT NULL,
  `IdCita` INT NULL,
  PRIMARY KEY (`idResenia`),
  INDEX `fk3_idx` (`IdNumeroColegiado` ASC) VISIBLE,
  INDEX `fk4_idx` (`DNIPaciente` ASC) VISIBLE,
  INDEX `fk12_idx` (`IdCita` ASC) VISIBLE,
  CONSTRAINT `fk3`
    FOREIGN KEY (`IdNumeroColegiado`)
    REFERENCES `reservacitas`.`medicos` (`IdNumeroColegiado`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk4`
    FOREIGN KEY (`DNIPaciente`)
    REFERENCES `reservacitas`.`pacientes` (`DNIPaciente`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk12`
    FOREIGN KEY (`IdCita`)
    REFERENCES `reservacitas`.`citas` (`IdCita`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- Medicos--
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345678', 'Marta', 'Frances', 'Medicina Familiar', '1', 'Maniana', 'Marta@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'Si');
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345675', 'Esther', 'Esther', 'Medicina Familiar', '8', 'Maniana', 'Esther@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No');
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345679', 'Fran', 'Fran', 'Pediatria', '2', 'Maniana', 'Fran@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345677', 'Jose', 'Ignacio', 'Pediatria', '3', 'Tarde', 'Jose@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345676', 'Miguel', 'Miguel', 'Psicologia', '7', 'Maniana y Tarde', 'Miguel@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345674', 'Rodrigo', 'Rodrigo', 'Pediatria', '6', 'Tarde', 'Jose@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345673', 'Unai', 'Unai', 'Traumatologia', '9', 'Maniana y Tarde', 'Unai@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345672', 'Angela', 'Angela', 'Traumatologia', '10', 'Maniana y Tarde', 'Angela@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 
INSERT INTO `reservacitas`.`medicos` (`IdNumeroColegiado`, `NombreMedico`, `ApellidoMedico`, `Especialidad`, `Consulta`, `DisponibilidadMedico`, `CorreoMedico`, `PasswordMedico`, `Administrador`) VALUES ('12345671', 'Alex', 'Alex', 'Traumatologia', '11', 'Maniana y Tarde', 'Alex@clinica.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S', 'No'); 


-- Pacientes--
INSERT INTO `reservacitas`.`pacientes` (`NombrePaciente`, `ApellidoPaciente`, `DNIPaciente`, `DireccionPaciente`, `MovilPaciente`, `IdSeguroMedico`, `CorreoPaciente`, `PasswordPaciente`) VALUES ('Marta', 'Frances', '12345678A', 'Santa Clara', '111222333', '4', 'Marta@Marta.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S');
INSERT INTO `reservacitas`.`pacientes` (`NombrePaciente`, `ApellidoPaciente`, `DNIPaciente`, `DireccionPaciente`, `MovilPaciente`, `IdSeguroMedico`, `CorreoPaciente`, `PasswordPaciente`) VALUES ('Marta1', 'Frances', '12345678B', 'Santa Clara', '111222333', '4', 'Marta1@Marta.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S');
INSERT INTO `reservacitas`.`pacientes` (`NombrePaciente`, `ApellidoPaciente`, `DNIPaciente`, `DireccionPaciente`, `MovilPaciente`, `IdSeguroMedico`, `CorreoPaciente`, `PasswordPaciente`) VALUES ('Marta2', 'Frances', '12345678C', 'Santa Clara', '111222333', '4', 'Marta2@Marta.com', '$2b$10$dJ7.renmaUjUT7GNrrUM8OYZfaDNdO9o7zlLfjU/HfG6HrOsGrS0S');

-- Citas--
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('1', '12345678A', '12345678', '2024-1-29', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('2', '12345678A', '12345678', '2024-2-19', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('3', '12345678B', '12345678', '2024-2-20', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('4', '12345678B', '12345678', '2024-2-21', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('5', '12345678C', '12345678', '2024-2-25', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('6', '12345678C', '12345675', '2024-2-3', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('7', '12345678A', '12345675', '2024-1-20', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('8', '12345678A', '12345675', '2024-3-19', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('9', '12345678A', '12345679', '2024-3-20', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('10', '12345678A', '12345679', '2024-4-21', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('11', '12345678A', '12345679', '2024-5-25', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('12', '12345678A', '12345676', '2024-7-3', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('13', '12345678C', '12345675', '2024-2-3', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('14', '12345678A', '12345675', '2024-1-20', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('15', '12345678A', '12345675', '2024-7-19', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('16', '12345678A', '12345674', '2024-8-20', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('17', '12345678A', '12345674', '2024-12-21', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('18', '12345678A', '12345673', '2024-11-25', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('19', '12345678A', '12345673', '2024-10-3', 'MALITO DEL CULO', '50', '17:00', 'En curso');
INSERT INTO `reservacitas`.`citas` (`IdCita`, `DNIPaciente`, `IdNumeroColegiado`, `Fecha`, `Diagnostico`, `PrecioCita`, `Hora`, `EstadoCita`) VALUES ('20', '12345678A', '12345672', '2024-9-3', 'MALITO DEL CULO', '50', '17:00', 'En curso');

-- Pagosfacturacion--
INSERT INTO `reservacitas`.`pagosfacturacion` (`IdCita`, `Fechapago`, `Metodopago`, `IdSeguroMedico`, `PrecioTotal`) VALUES ('1', '2022-10-20', 'tarjeta', '1', '17');
INSERT INTO `reservacitas`.`pagosfacturacion` (`IdCita`, `Fechapago`, `Metodopago`, `IdSeguroMedico`, `PrecioTotal`) VALUES ('2', '2023-10-19', 'tarjeta', '2', '14');
INSERT INTO `reservacitas`.`pagosfacturacion` (`IdCita`, `Fechapago`, `Metodopago`, `IdSeguroMedico`, `PrecioTotal`) VALUES ('3', '2023-11-20', 'tarjeta', '3', '19');

-- Recetas --
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('4 veces', 'al dia', '1');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('5 veces', 'al dia', '2');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('8 veces', 'al dia', '3');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('4 veces', 'al dia', '1');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('5 veces', 'al dia', '2');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('8 veces', 'al dia', '3');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('4 veces', 'al dia', '1');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('5 veces', 'al dia', '2');
INSERT INTO `reservacitas`.`recetasmedicas` (`Dosis`, `InstruccionUso`, `IdCita`) VALUES ('8 veces', 'al dia', '3');

-- has--
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('9', '1');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('10', '2');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('11', '3');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('1', '4');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('2', '5');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('5', '6');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('6', '7');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('7', '8');
INSERT INTO `reservacitas`.`medicamento_has_recetasmedicas` (`Medicamento_idMedicamento`, `RecetasMedicas_idReceta`) VALUES ('3', '9');



-- Seguros--
INSERT INTO `reservacitas`.`segurosmedicos` (`NombreSeguro`, `DescuentoSeguro`) VALUES ('Assa', '20');
INSERT INTO `reservacitas`.`segurosmedicos` (`NombreSeguro`, `DescuentoSeguro`) VALUES ('Adeslas', '10');
INSERT INTO `reservacitas`.`segurosmedicos` (`NombreSeguro`, `DescuentoSeguro`) VALUES ('Allianz', '40');
INSERT INTO `reservacitas`.`segurosmedicos` (`NombreSeguro`, `DescuentoSeguro`) VALUES ('Antares', '50');
INSERT INTO `reservacitas`.`segurosmedicos` (`NombreSeguro`, `DescuentoSeguro`) VALUES ('Asisa', '30');
INSERT INTO `reservacitas`.`segurosmedicos` (`NombreSeguro`, `DescuentoSeguro`) VALUES ('Avant', '30');

-- Medicamentos--
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('4', 'Paracetamol', 'Analgesicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('18', 'Morfina', 'Analgesicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('2', 'Omeprazol', 'Antiacidosos y antiulcerosos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('7', 'Enantyum', 'Antiinflamatorios');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('5', 'Ibuprofeno', 'Antiinflamatorios');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('7', 'Fumil', 'Mucoliticos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('16', 'Mucosan', 'Mucoliticos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('9', 'Codeina', 'Antitusivos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('17', 'Fortasec', 'Antidiarreicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('14', 'Hidrasec', 'Antidiarreicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('19', 'Loperan', 'Antidiarreicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('10', 'Ebastina', 'Antialergicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('9', 'Bilastina', 'Antialergicos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('8', 'Nolotil', 'Antipireticos');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('5', 'Correctal', 'Laxantes');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('3', 'Dulcolax', 'Laxantes');
INSERT INTO `reservacitas`.`medicamento` (`PagoMedicamento`, `NombreMedicamento`, `TipoMedicamento`) VALUES ('6', 'Ex-Lax', 'Laxantes');
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- $2y$10$4HhW25Ex/yUDFJywBSBmGeYInpgqL9ZWul18fcsjgu3eExt8UJ.SS -- --hash php--
