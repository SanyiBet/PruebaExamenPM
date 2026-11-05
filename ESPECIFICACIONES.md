# Especificación Técnica del Sistema - Reserva de Asientos (Contexto Ecuador)

## 1. Descripción General del Problema

Las empresas de transporte interprovincial en Ecuador (como las cooperativas que operan en El Oro y rutas hacia Guayaquil o Quito) enfrentan problemas de alta concurrencia en la venta presencial y telefónica de boletos, lo que genera dobles reservas, pérdida de trazabilidad y bloqueos prolongados de asientos sin concretar el pago.

## 2. Requerimientos Funcionales

- **RF-01**: El sistema debe listar los asientos del bus diferenciando visualmente tres estados: `disponible`, `bloqueado` y `ocupado`.
- **RF-02**: El usuario debe ingresar su nombre o cédula para realizar una selección válida.
- **RF-03**: Al hacer clic en un asiento disponible, el backend debe cambiar su estado a `bloqueado` de manera exclusiva.
- **RF-04**: El bloqueo del asiento debe tener una vigencia exacta de **10 minutos**, tras los cuales el sistema lo libera automáticamente si no se concreta la compra.

## 3. Arquitectura Tecnológica

- **Frontend**: Angular (Arquitectura basada en componentes standalone, consumo HTTP con servicios orientados a REST).
- **Backend**: Node.js con Express (Arquitectura modular por controladores y rutas).
- **Base de Datos**: PostgreSQL (Gestión de estados transaccionales y marcas de tiempo con `NOW() + INTERVAL '10 minutes'`).
- **DevOps & QA**: Control de versiones con Git/GitHub, ramas de características (`feature/*`), Pull Requests y automatización CI/CD mediante GitHub Actions.
