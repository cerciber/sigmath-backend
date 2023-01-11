/**
 * Módulo que se encarga de definir el entorno de pruebas inicial.
 *
 * @module test-prepare
 * @author Cerciber <contact@cerciber.com>
 */

// Definir varibales globales
require('../utils/globals/globals').setGlobals();

// Modulos instalados
const assert = require('assert'); // Assert
const supertest = require('supertest'); // Supertest
const chai = require('chai'); // Chai

// Modulos creados
const _enviroment = require('../utils/constants/enviroment.json');

// Definir variables globales
global.enviroment = _enviroment.test;
global.assert = assert;
global.supertest = supertest;
global.chai = chai;
