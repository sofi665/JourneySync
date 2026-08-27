# JourneySync

JourneySync es una aplicación web de planificación de viajes colaborativa que permite crear viajes, administrar participantes, organizar gastos y consultar información relacionada con cada viaje.

Este proyecto incorpora prácticas de DevOps para automatización, contenerización, orquestación, infraestructura como código, seguridad y observabilidad.

## Índice

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Ejecución con Docker Compose](#ejecución-con-docker-compose)
- [Despliegue con Kubernetes](#despliegue-con-kubernetes)
- [Secrets de Kubernetes](#secrets-de-kubernetes)
- [Terraform](#terraform)
- [CI/CD](#cicd)
- [Seguridad](#seguridad)
- [Observabilidad](#observabilidad)
- [Accesos y puertos](#accesos-y-puertos)
- [Estado del proyecto](#estado-del-proyecto)
- [Mejoras futuras](#mejoras-futuras)

---

## Descripción

JourneySync es una aplicación desarrollada con una arquitectura frontend/backend.

El backend está desarrollado con Java 21 y Spring Boot y expone una API REST. El frontend está desarrollado con Next.js, React y TypeScript.

La aplicación utiliza PostgreSQL como base de datos y cuenta con diferentes recursos para su ejecución tanto mediante Docker Compose como mediante Kubernetes.

La implementación DevOps incorpora:

- Contenedores Docker.
- Docker Compose.
- Kubernetes.
- Persistencia mediante StatefulSet y PVC.
- Horizontal Pod Autoscaler (HPA).
- Health checks mediante readiness y liveness probes.
- Configuración mediante variables de entorno.
- Gestión de secretos mediante Kubernetes Secrets.
- Infraestructura como código mediante Terraform.
- Integración continua y despliegue continuo mediante GitHub Actions.
- Análisis de seguridad con Gitleaks y Semgrep.
- Monitorización mediante Prometheus y Grafana.
- Reglas de alertas para CPU y memoria.

---

## Arquitectura

La arquitectura de despliegue está compuesta por:

```text
                         +---------------------+
                         |       Usuario       |
                         +----------+----------+
                                    |
                                    v
                         +---------------------+
                         |      Frontend       |
                         |      Next.js        |
                         |      Port 3000      |
                         +----------+----------+
                                    |
                                    v
                         +---------------------+
                         |       Backend       |
                         |   Spring Boot API   |
                         |      Port 8080      |
                         +----------+----------+
                                    |
                                    v
                         +---------------------+
                         |     PostgreSQL      |
                         |     StatefulSet     |
                         |      Port 5432      |
                         |   Persistent PVC    |
                         +---------------------+


              +----------------------------------------+
              |             Observabilidad              |
              |                                        |
              |          Prometheus -> Grafana          |
              |                                        |
              |       CPU / Memoria / Metricas          |
              |                 +                      |
              |               Alertas                   |
              +----------------------------------------+
              
```
              

En Kubernetes, el backend y frontend se ejecutan con múltiples réplicas y el backend dispone de escalado horizontal mediante HPA.

---

## Tecnologías

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- Lombok
- ModelMapper
- OpenAPI / Swagger

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### DevOps

- Docker
- Docker Compose
- Kubernetes
- Terraform
- GitHub Actions
- GitHub Container Registry

### Seguridad

- Gitleaks
- Semgrep

### Observabilidad

- Prometheus
- Grafana
- Kubernetes Metrics

---

## Estructura del proyecto

    JourneySync/
    |
    +-- Backend/
    |   +-- Aplicación Spring Boot
    |
    +-- Frontend/
    |   +-- Aplicación Next.js
    |
    +-- k8s/
    |   +-- namespace.yaml
    |   +-- backend-deployment.yaml
    |   +-- backend-service.yaml
    |   +-- frontend-deployment.yaml
    |   +-- frontend-service.yaml
    |   +-- postgres-statefulset.yaml
    |   +-- postgres-service.yaml
    |   +-- hpa.yaml
    |   +-- ingress.yaml
    |
    +-- terraform/
    |   +-- main.tf
    |   +-- variables.tf
    |   +-- outputs.tf
    |   +-- versions.tf
    |   +-- modules/
    |       +-- kubernetes/
    |
    +-- .github/
    |   +-- workflows/
    |
    +-- docker-compose.yml
    +-- README.md

---

## Requisitos

Para ejecutar el proyecto se requiere:

- Git
- Docker Desktop
- Kubernetes habilitado en Docker Desktop
- kubectl
- Terraform
- Java 21
- Node.js y npm

---

## Ejecución con Docker Compose

Docker Compose permite ejecutar los principales servicios de JourneySync de forma local.

Los servicios principales son:

- PostgreSQL
- Backend
- Frontend

### Configuración

Las credenciales y configuraciones sensibles deben proporcionarse mediante variables de entorno.

No se deben almacenar credenciales reales dentro del repositorio.

### Construir y ejecutar

    docker compose up --build

Para ejecutar los servicios en segundo plano:

    docker compose up -d --build

### Detener los servicios

    docker compose down

Para eliminar también los volúmenes:

    docker compose down -v

---

## Despliegue con Kubernetes

El proyecto incluye manifiestos Kubernetes dentro de:

    k8s/

La infraestructura desplegada incluye:

- Namespace
- Backend Deployment
- Frontend Deployment
- PostgreSQL StatefulSet
- Services
- NodePorts
- Persistent Volume Claim
- Horizontal Pod Autoscaler
- Ingress
- Readiness probes
- Liveness probes
- Resource requests y limits

### Verificar el contexto

    kubectl config current-context

El entorno utilizado durante el desarrollo es:

    docker-desktop

### Crear el namespace

    kubectl apply -f k8s/namespace.yaml

### Crear los Secrets

Antes de desplegar backend y PostgreSQL es necesario crear el Secret:

    kubectl create secret generic journeysync-secrets -n journeysync --from-literal=postgres-password="<TU_PASSWORD>" --from-literal=jwt-secret="<TU_JWT_SECRET>"

Los valores reales no deben almacenarse en Git.

### Aplicar los recursos

    kubectl apply -f k8s/

### Verificar los recursos

    kubectl get pods -n journeysync

    kubectl get deployments -n journeysync

    kubectl get services -n journeysync

    kubectl get hpa -n journeysync

### Estado validado durante el desarrollo

El entorno utilizado presentó:

- Backend: 2 réplicas
- Frontend: 2 réplicas
- PostgreSQL: 1 pod
- HPA: mínimo 2 y máximo 3 réplicas

---

## Secrets de Kubernetes

Los Secrets contienen información sensible utilizada por la aplicación.

El proyecto utiliza:

    journeysync-secrets

con las siguientes claves:

- postgres-password
- jwt-secret

El Secret no se encuentra versionado en el repositorio para evitar exponer credenciales.

Para crear el recurso:

    kubectl create secret generic journeysync-secrets -n journeysync --from-literal=postgres-password="<TU_PASSWORD>" --from-literal=jwt-secret="<TU_JWT_SECRET>"

Los Deployments consumen estos valores mediante `secretKeyRef`.

---

## Terraform

Terraform se utiliza como herramienta de Infrastructure as Code para administrar recursos de Kubernetes.

La configuración se encuentra en:

    terraform/

La estructura utiliza un módulo para los recursos Kubernetes:

    terraform/
    |
    +-- main.tf
    +-- variables.tf
    +-- outputs.tf
    +-- versions.tf
    |
    +-- modules/
        |
        +-- kubernetes/
            +-- main.tf
            +-- variables.tf
            +-- outputs.tf

### Inicializar Terraform

    terraform -chdir=terraform init

### Formatear

    terraform -chdir=terraform fmt

### Validar

    terraform -chdir=terraform validate

### Revisar cambios

    terraform -chdir=terraform plan

Durante la validación del proyecto:

- `terraform validate` devolvió una configuración válida.
- `terraform plan` indicó que no había cambios pendientes.

El estado de Terraform (`terraform.tfstate`) y sus archivos asociados no deben versionarse.

---

## CI/CD

El proyecto utiliza GitHub Actions para automatizar procesos de integración y despliegue.

El flujo general es:

    Git Push / Pull Request
              |
              v
        GitHub Actions
              |
              +-- Backend tests
              |
              +-- Frontend build
              |
              +-- Gitleaks
              |
              +-- Semgrep
              |
              +-- Docker build
                       |
                       v
              GitHub Container Registry
                       |
                       v
                 Docker images

El pipeline permite detectar errores de compilación, ejecutar pruebas y realizar controles de seguridad antes del proceso de publicación de imágenes.

---

## Seguridad

La implementación incluye controles de seguridad dentro del pipeline.

### Gitleaks

Gitleaks se utiliza para detectar posibles secretos expuestos dentro del repositorio.

Se busca evitar la exposición de información como:

- Contraseñas
- Tokens
- API keys
- Credenciales

### Semgrep

Semgrep se utiliza para realizar análisis estático del código y detectar posibles patrones de vulnerabilidad.

Los controles de seguridad forman parte del proceso automatizado de CI.

---

## Observabilidad

El proyecto incorpora observabilidad mediante:

    Prometheus
        |
        v
      Grafana

Prometheus recopila métricas y Grafana permite visualizarlas mediante dashboards.

El dashboard desarrollado incluye paneles relacionados con:

- Uso de CPU
- Memoria
- Límites de recursos
- Rendimiento
- Métricas de los pods
- Recursos del backend
- Recursos del frontend

Durante el desarrollo se configuraron siete visualizaciones para analizar el comportamiento de la aplicación y sus recursos.

### Alertas

Se configuraron dos reglas de alerta en Grafana.

#### CPU alta

La alerta se activa cuando el uso de CPU del backend supera el umbral definido:

    CPU > 70%

#### Memoria alta

La alerta se activa cuando el consumo de memoria del backend supera el umbral definido.

Las reglas utilizan un período de evaluación y un período pendiente para evitar alertas provocadas por variaciones momentáneas.

---

## Accesos y puertos

### Docker Compose

Frontend:

    http://localhost:3000

Backend:

    http://localhost:8080

### Kubernetes

Frontend mediante NodePort:

    http://localhost:30500

Backend mediante NodePort:

    http://localhost:30080

Los puertos pueden variar según la configuración del entorno de ejecución.

---

## Estado del proyecto

Actualmente JourneySync cuenta con:

- Aplicación frontend y backend funcional
- Docker y Docker Compose
- Kubernetes
- PostgreSQL mediante StatefulSet
- Persistencia mediante PVC
- Múltiples réplicas
- Horizontal Pod Autoscaler
- Readiness y liveness probes
- Resource requests y limits
- Terraform
- CI/CD con GitHub Actions
- Publicación de imágenes mediante GHCR
- Gitleaks
- Semgrep
- Prometheus
- Grafana
- Dashboards de monitorización
- Alertas de CPU y memoria

La infraestructura fue validada mediante Terraform utilizando:

    terraform validate

y:

    terraform plan

obteniendo una configuración válida y sin cambios pendientes respecto de la infraestructura administrada.

---

## Mejoras futuras

Como posibles mejoras futuras se consideran:

- Incorporar análisis de dependencias (SCA)
- Incorporar container scanning mediante Trivy dentro del pipeline
- Incorporar pruebas de seguridad dinámicas (DAST) con OWASP ZAP
- Implementar quality gates de seguridad más estrictos
- Incorporar logging estructurado y correlation IDs
- Utilizar múltiples nodos Kubernetes para permitir una distribución real de workloads mediante `topologySpreadConstraints`
- Ampliar las estrategias de notificación de alertas

Estas mejoras no afectan el funcionamiento actual de la aplicación ni de la infraestructura implementada.

---

## Autor

Proyecto desarrollado como trabajo final de DevOps.
