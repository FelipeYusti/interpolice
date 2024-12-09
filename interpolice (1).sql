-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-12-2024 a las 19:37:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citizen`
--

CREATE TABLE `citizen` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellidos` varchar(150) DEFAULT NULL,
  `apodo` varchar(200) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `foto` varchar(256) NOT NULL,
  `fechanace` date NOT NULL,
  `especie_ciudadano_idespecie_ciudadano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citizen`
--

INSERT INTO `citizen` (`id`, `nombre`, `apellidos`, `apodo`, `email`, `foto`, `fechanace`, `especie_ciudadano_idespecie_ciudadano`) VALUES
(1, 'Peter', 'Parker', 'Spider-Man', 'peter.parker@marvel.com', '', '1995-08-10', 1),
(2, 'Carol', 'Danvers', 'Captain Marvel', 'carol.danvers@marvel.com', '', '1980-10-15', 1),
(3, 'Tony', 'Stark', 'Iron Man', 'tony.stark@marvel.com', '', '1970-05-29', 1),
(4, 'Thor', 'Odinson', 'God of Thunder', 'thor.odinson@asgard.com', '', '0990-11-30', 2),
(5, 'Natasha', 'Romanoff', 'Black Widow', 'natasha.romanoff@marvel.com', '', '1984-12-03', 1),
(6, 'Bruce', 'Banner', 'Hulk', 'bruce.banner@marvel.com', '', '1969-12-18', 1),
(7, 'Wanda', 'Maximoff', 'Scarlet Witch', 'wanda.maximoff@marvel.com', '', '1989-02-10', 1),
(8, 'Vision', 'Synthzoid', 'Vision', 'vision@avengers.com', '', '2021-01-01', 3),
(9, 'Gamora', 'Zen-Whoberi', 'The Deadliest Woman', 'gamora@guardians.com', '', '1990-03-19', 2),
(10, 'Stephen', 'Strange', 'Doctor Strange', 'stephen.strange@marvel.com', '', '1978-11-18', 1),
(11, 'TChalla', 'Udaku', 'Black Panther', 'tchalla.udaku@wakanda.com', '', '1980-01-14', 1),
(12, 'Peter', 'Quill', 'Star-Lord', 'peter.quill@guardians.com', '', '1983-07-04', 2),
(13, 'Drax', 'Destroyer', 'The Destroyer', 'drax@guardians.com', '', '1975-09-12', 2),
(14, 'Rocket', 'Raccoon', 'Rocket', 'rocket@guardians.com', '', '2008-04-01', 2),
(15, 'Ultron', 'Prime', 'Ultron', 'ultron@robots.com', '', '2022-06-15', 3),
(16, 'Peter', 'Parker', 'Spider-Man', 'peter.parker@marvel.com', '', '1995-08-10', 1),
(17, 'Carol', 'Danvers', 'Captain Marvel', 'carol.danvers@marvel.com', '', '1980-10-15', 1),
(18, 'Tony', 'Stark', 'Iron Man', 'tony.stark@marvel.com', '', '1970-05-29', 1),
(19, 'Thor', 'Odinson', 'God of Thunder', 'thor.odinson@asgard.com', '', '0990-11-30', 2),
(20, 'Natasha', 'Romanoff', 'Black Widow', 'natasha.romanoff@marvel.com', '', '1984-12-03', 1),
(21, 'Bruce', 'Banner', 'Hulk', 'bruce.banner@marvel.com', '', '1969-12-18', 1),
(22, 'Wanda', 'Maximoff', 'Scarlet Witch', 'wanda.maximoff@marvel.com', '', '1989-02-10', 1),
(23, 'Vision', 'Synthzoid', 'Vision', 'vision@avengers.com', '', '2021-01-01', 3),
(24, 'Gamora', 'Zen-Whoberi', 'The Deadliest Woman', 'gamora@guardians.com', '', '1990-03-19', 2),
(25, 'Stephen', 'Strange', 'Doctor Strange', 'stephen.strange@marvel.com', '', '1978-11-18', 1),
(26, 'TChalla', 'Udaku', 'Black Panther', 'tchalla.udaku@wakanda.com', '', '1980-01-14', 1),
(27, 'Peter', 'Quill', 'Star-Lord', 'peter.quill@guardians.com', '', '1983-07-04', 2),
(28, 'Drax', 'Destroyer', 'The Destroyer', 'drax@guardians.com', '', '1975-09-12', 2),
(29, 'Rocket', 'Raccoon', 'Rocket', 'rocket@guardians.com', '', '2008-04-01', 2),
(30, 'Ultron', 'Prime', 'Ultron', 'ultron@robots.com', '', '2022-06-15', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citizen_has_registro_delito`
--

CREATE TABLE `citizen_has_registro_delito` (
  `citizen_id` int(11) NOT NULL,
  `registro_delito_idregistro_delito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especie_ciudadano`
--

CREATE TABLE `especie_ciudadano` (
  `idespecie_ciudadano` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especie_ciudadano`
--

INSERT INTO `especie_ciudadano` (`idespecie_ciudadano`, `nombre`) VALUES
(1, 'Human'),
(2, 'Extraterrestre'),
(3, 'Androide'),
(5, 'Deidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grado_delito`
--

CREATE TABLE `grado_delito` (
  `id` int(11) NOT NULL,
  `grado` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grado_delito`
--

INSERT INTO `grado_delito` (`id`, `grado`) VALUES
(1, 'Grado 1'),
(2, 'Grado 2'),
(3, 'Grado 3'),
(4, 'Grado 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_delito`
--

CREATE TABLE `registro_delito` (
  `idregistro_delito` int(11) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `tipo_delito_idtipo_delito` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idrol` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idrol`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Juez'),
(3, 'Policia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_delito`
--

CREATE TABLE `tipo_delito` (
  `idtipo_delito` int(11) NOT NULL,
  `delito` varchar(45) DEFAULT NULL,
  `grado_delito_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_delito`
--

INSERT INTO `tipo_delito` (`idtipo_delito`, `delito`, `grado_delito_id`) VALUES
(1, 'Robo', 2),
(2, 'Homicidio', 3),
(3, 'Fraude', 1),
(4, 'Vandalismo', 2),
(5, 'Secuestro Planeado', 4),
(6, 'Terrorismo Planetario', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `rol_idrol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `nombre`, `password`, `rol_idrol`) VALUES
(3, 'Gutter', '$2a$10$nD9RPmoMZ9Xxv3NaiaXw9eRFj1ju1wnbBpjpFG3NC9AhCwO4nwBxa', 1),
(5, 'Jhon', '$2a$10$R2b8sEhNqUaDJATC1LmHQO0UIMeAV7N7hDJT70Epkixf3Lxjizoim', 3),
(6, 'Alvaro', '$2a$10$cs1Y0jixcabXHvxxjWriIu6nrZBdfOaZMK9rtznOhoOuKJ9EDJ05m', 2),
(7, 'Anderson', '$2a$10$zTx1jNzT0lKdDDsu6wHsFuC3LgLSl.r4sCUSC8qCiCT6ECApfe8Aq', 3),
(8, 'Nicolas', '$2a$10$bAKg2k3xWC8r4WfEyDks6eZ0qDjhNvZwlx.AcXqw0GGUpNDSpg16m', 1),
(9, 'Daniel', '$2a$10$tTcvu12umln349y3TWYJ9OrZF3N4mxbZ7.Iwp0W5MoatGfh8d85ka', 3),
(10, 'Juanes', '$2a$10$aW.xRVFyUwNhwy/PAqlyN.AW1WLpr8URlVlhGwqwkLkDBlQNO3YcS', 2),
(11, 'Yisus', '$2a$10$pu40MhbS.aGfhc4FcKSKgekmHhY/ZkSJjYi.mhkylgeXnnC8wftXC', 2),
(12, 'Jhonson', '$2a$10$ynm6UmKlKarSey75Q9ixKuXwNzpa78WK8tlULp9BbKArLSK3hm0pe', 3),
(13, 'John Wick', '$2a$10$Ch55F9alup.PlH7xIgnXkOGvYjaJnNFHBGUX1qTRddvKCkZSxxCey', 2),
(14, 'Lee Han', '$2a$10$jfQFTSswskbLDTa4C0DobuuO1E733gDAfmQ.ZJ5tIz7Ro1L8K91gS', 3),
(15, 'Merry', '$2a$10$fvXhUkjsTG.tQ5JSp6pFhOs3j..qfHK0dph/LI4wQHVITu5lincKe', 2),
(16, 'Johs', '$2a$10$jEbEM0mfzAYFGvjsiQHU2uTzNM1WnLqW/w0NG5twElodqi7xNt0S.', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_citizen_especie_ciudadano_idx` (`especie_ciudadano_idespecie_ciudadano`);

--
-- Indices de la tabla `citizen_has_registro_delito`
--
ALTER TABLE `citizen_has_registro_delito`
  ADD PRIMARY KEY (`citizen_id`,`registro_delito_idregistro_delito`),
  ADD KEY `fk_citizen_has_registro_delito_registro_delito1_idx` (`registro_delito_idregistro_delito`),
  ADD KEY `fk_citizen_has_registro_delito_citizen1_idx` (`citizen_id`);

--
-- Indices de la tabla `especie_ciudadano`
--
ALTER TABLE `especie_ciudadano`
  ADD PRIMARY KEY (`idespecie_ciudadano`);

--
-- Indices de la tabla `grado_delito`
--
ALTER TABLE `grado_delito`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro_delito`
--
ALTER TABLE `registro_delito`
  ADD PRIMARY KEY (`idregistro_delito`),
  ADD KEY `fk_registro_delito_tipo_delito1_idx` (`tipo_delito_idtipo_delito`),
  ADD KEY `fk_registro_delito_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `tipo_delito`
--
ALTER TABLE `tipo_delito`
  ADD PRIMARY KEY (`idtipo_delito`),
  ADD KEY `fk_tipo_delito_grado_delito1_idx` (`grado_delito_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`),
  ADD KEY `fk_usuarios_rol1_idx` (`rol_idrol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citizen`
--
ALTER TABLE `citizen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `especie_ciudadano`
--
ALTER TABLE `especie_ciudadano`
  MODIFY `idespecie_ciudadano` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `grado_delito`
--
ALTER TABLE `grado_delito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_delito`
--
ALTER TABLE `tipo_delito`
  MODIFY `idtipo_delito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citizen`
--
ALTER TABLE `citizen`
  ADD CONSTRAINT `fk_citizen_especie_ciudadano` FOREIGN KEY (`especie_ciudadano_idespecie_ciudadano`) REFERENCES `especie_ciudadano` (`idespecie_ciudadano`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `citizen_has_registro_delito`
--
ALTER TABLE `citizen_has_registro_delito`
  ADD CONSTRAINT `fk_citizen_has_registro_delito_citizen1` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citizen_has_registro_delito_registro_delito1` FOREIGN KEY (`registro_delito_idregistro_delito`) REFERENCES `registro_delito` (`idregistro_delito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `registro_delito`
--
ALTER TABLE `registro_delito`
  ADD CONSTRAINT `fk_registro_delito_tipo_delito1` FOREIGN KEY (`tipo_delito_idtipo_delito`) REFERENCES `tipo_delito` (`idtipo_delito`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_registro_delito_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tipo_delito`
--
ALTER TABLE `tipo_delito`
  ADD CONSTRAINT `fk_tipo_delito_grado_delito1` FOREIGN KEY (`grado_delito_id`) REFERENCES `grado_delito` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_rol1` FOREIGN KEY (`rol_idrol`) REFERENCES `rol` (`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
