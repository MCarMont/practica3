-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2018 a las 23:44:03
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `maquinaria`
--
CREATE DATABASE `maquinaria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `maquinaria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE IF NOT EXISTS `alquiler` (
  `idAlquiler` varchar(255) NOT NULL DEFAULT '',
  `fechaInicio` date DEFAULT NULL,
  `fechaFinal` date DEFAULT NULL,
  `importe` int(11) DEFAULT NULL,
  `dniCliente` varchar(255) DEFAULT NULL,
  `dniEmpleado` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idAlquiler`),
  KEY `dniCliente` (`dniCliente`),
  KEY `dniEmpleado` (`dniEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`idAlquiler`, `fechaInicio`, `fechaFinal`, `importe`, `dniCliente`, `dniEmpleado`, `estado`) VALUES
('A-34', '2018-02-27', '2018-03-30', 39960, '14569875Y', '25885695T', 1),
('A-345', '2018-02-27', '2018-03-16', 14824, '78954652T', '24566318F', 1),
('A-456', '2018-02-27', '2018-03-23', 6096, '48789562G', '25885695T', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `dniCliente` varchar(255) NOT NULL DEFAULT '',
  `nombreCliente` varchar(255) DEFAULT NULL,
  `apellidoCliente` varchar(255) DEFAULT NULL,
  `telCliente` int(11) DEFAULT NULL,
  `dirCliente` varchar(255) DEFAULT NULL,
  `localidadCliente` varchar(255) DEFAULT NULL,
  `cpCliente` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`dniCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`dniCliente`, `nombreCliente`, `apellidoCliente`, `telCliente`, `dirCliente`, `localidadCliente`, `cpCliente`, `estado`) VALUES
('14569875Y', 'Elena', 'Nito del Bosque', 666589785, 'Forest 78', 'San Juan', 47895, 1),
('48789562G', 'Armando', 'Bronca Segura', 665478568, 'Sevilla 78', 'Mairena del Aljarafe', 78954, 1),
('78954652T', 'Antonio', 'Bragueta Suelta', 989647123, 'Americo Vizcucio 7', 'Los Remedios', 47895, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devolucion`
--

CREATE TABLE IF NOT EXISTS `devolucion` (
  `idDevolucion` int(11) NOT NULL AUTO_INCREMENT,
  `idAlquiler` varchar(255) DEFAULT NULL,
  `fechaDevolucion` date DEFAULT NULL,
  `sMotivo` varchar(255) DEFAULT NULL,
  `empleado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idDevolucion`),
  KEY `idAlquiler` (`idAlquiler`),
  KEY `empleado` (`empleado`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `devolucion`
--

INSERT INTO `devolucion` (`idDevolucion`, `idAlquiler`, `fechaDevolucion`, `sMotivo`, `empleado`) VALUES
(2, 'A-456 ', '2018-02-27', 'La Lijadora se ha roto', '45614489H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE IF NOT EXISTS `empleado` (
  `dniEmpleado` varchar(255) NOT NULL DEFAULT '0',
  `nombreEmpleado` varchar(255) DEFAULT NULL,
  `apellidoEmpleado` varchar(255) DEFAULT NULL,
  `telEmpleado` int(11) DEFAULT NULL,
  `dirEmpleado` varchar(255) DEFAULT NULL,
  `localidadEmpleado` varchar(255) DEFAULT NULL,
  `cpEmpleado` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`dniEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`dniEmpleado`, `nombreEmpleado`, `apellidoEmpleado`, `telEmpleado`, `dirEmpleado`, `localidadEmpleado`, `cpEmpleado`, `estado`) VALUES
('24566318F', 'Lola ', 'Mento', 654321895, 'Calle Asturias 25', 'Huelva', 46981, 1),
('25885695T', 'Armando ', 'Bronca Grande', 789562314, 'Los aires 34', 'Sevilla', 41089, 1),
('45614489H', 'Eusebia', 'Tetas Planas', 647821369, 'Los Vendidos 45', 'Sevilla', 41010, 1),
('47852622G', 'Luz ', 'Cuesta Mogollón', 658997441, 'Calle Extremadura 14', 'Malaga', 48952, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineasalquiler`
--

CREATE TABLE IF NOT EXISTS `lineasalquiler` (
  `idAlquiler` varchar(255) NOT NULL DEFAULT '',
  `idMaquina` varchar(255) NOT NULL DEFAULT '',
  `unidades` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlquiler`,`idMaquina`),
  KEY `idMaquina` (`idMaquina`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `lineasalquiler`
--

INSERT INTO `lineasalquiler` (`idAlquiler`, `idMaquina`, `unidades`) VALUES
('A-34', '32456', 3),
('A-34', '86731', 2),
('A-345', '32456', 2),
('A-345', '86731', 1),
('A-456', '5145354', 2),
('A-456', '86731', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE IF NOT EXISTS `localidades` (
  `codLoc` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codLoc`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `localidades`
--

INSERT INTO `localidades` (`codLoc`, `nombre`) VALUES
(1, 'Sevilla'),
(2, 'Huelva'),
(3, 'Jaén'),
(4, 'Granada'),
(5, 'Cádiz'),
(6, 'Málaga');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquinaria`
--

CREATE TABLE IF NOT EXISTS `maquinaria` (
  `modelo` varchar(255) DEFAULT NULL,
  `idMaquina` varchar(255) NOT NULL DEFAULT '',
  `nombreMaquina` varchar(255) DEFAULT NULL,
  `descMaquina` varchar(255) DEFAULT NULL,
  `precioAlquiler` int(11) DEFAULT NULL,
  `fechaCompra` date DEFAULT NULL,
  `importeCompra` int(11) DEFAULT NULL,
  `proveedor` varchar(255) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idMaquina`),
  KEY `proveedor` (`proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `maquinaria`
--

INSERT INTO `maquinaria` (`modelo`, `idMaquina`, `nombreMaquina`, `descMaquina`, `precioAlquiler`, `fechaCompra`, `importeCompra`, `proveedor`, `estado`) VALUES
('Av4895', '32456', 'Camion Tractor', 'Camion bicilindrico', 412, '2018-02-12', 26000, '32459736J', 1),
('Av789', '5145354', 'Fresadora industrial', 'Fresas del calibre 90', 79, '2017-02-14', 3489, '98745622P', 1),
('Av4563', '86731', 'Lijadora Industrial', 'Lijas finas y gruesas', 48, '2015-09-15', 258, '47895623H', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE IF NOT EXISTS `proveedor` (
  `dniProv` varchar(255) NOT NULL DEFAULT '0',
  `nombreProv` varchar(255) DEFAULT NULL,
  `apellidoProv` varchar(255) DEFAULT NULL,
  `empresaProv` varchar(255) DEFAULT NULL,
  `telefonoProv` int(11) DEFAULT NULL,
  `direccionProv` varchar(255) DEFAULT NULL,
  `localidadProv` varchar(255) DEFAULT NULL,
  `cPostalProv` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`dniProv`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`dniProv`, `nombreProv`, `apellidoProv`, `empresaProv`, `telefonoProv`, `direccionProv`, `localidadProv`, `cPostalProv`, `estado`) VALUES
('32459736J', 'Rafael', 'Nieto de Dios', 'La  Mas Chula de Jerez', 789536214, 'La calle del Barrio 9', 'Jerez', 21457, 1),
('46791455F', 'Paca', 'Garte Fuera', 'Roca', 615489632, 'Cantera de Piedra 7', 'Utrerea', 14789, 1),
('47895623H', 'Soila', 'Cerda Rosa', 'Los pitufos verdes', 789456213, 'La comandancia 4', 'Dos Hermanas', 41089, 1),
('98745622P', 'Ana', 'Tomia de Carlos', 'Hospital Central', 754125694, 'Ambulancias 478', 'Alcala de Guadaira', 45689, 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `alquiler_ibfk_1` FOREIGN KEY (`dniCliente`) REFERENCES `cliente` (`dniCliente`),
  ADD CONSTRAINT `alquiler_ibfk_2` FOREIGN KEY (`dniEmpleado`) REFERENCES `empleado` (`dniEmpleado`);

--
-- Filtros para la tabla `devolucion`
--
ALTER TABLE `devolucion`
  ADD CONSTRAINT `devolucion_ibfk_1` FOREIGN KEY (`idAlquiler`) REFERENCES `alquiler` (`idAlquiler`),
  ADD CONSTRAINT `devolucion_ibfk_2` FOREIGN KEY (`empleado`) REFERENCES `empleado` (`dniEmpleado`);

--
-- Filtros para la tabla `lineasalquiler`
--
ALTER TABLE `lineasalquiler`
  ADD CONSTRAINT `lineasalquiler_ibfk_1` FOREIGN KEY (`idAlquiler`) REFERENCES `alquiler` (`idAlquiler`),
  ADD CONSTRAINT `lineasalquiler_ibfk_2` FOREIGN KEY (`idMaquina`) REFERENCES `maquinaria` (`idMaquina`);

--
-- Filtros para la tabla `maquinaria`
--
ALTER TABLE `maquinaria`
  ADD CONSTRAINT `maquinaria_ibfk_1` FOREIGN KEY (`proveedor`) REFERENCES `proveedor` (`dniProv`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
