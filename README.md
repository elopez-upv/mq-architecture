# :rocket: (SAD) - Sistema Distribuido - Git Executor

Git executor es un sistema distribuido conformado por un grupo de servicios con el fin de ejecutar ficheros Shell `(.sh)`. El sistema está basado en una arquitectura orientada a `eventos` haciendo uso del patrón `Publish/Subscribe`. 

<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/pub-sub.gif?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="200">
</p>

##  Tabla de Contenido
- [Desarrolladores](#desarrolladores)
- [Funcionamiento](#funcionamiento)
  - [Limitaciones y Consideraciones](#limitaciones-y-consideraciones)
- [Arquitectura](#arquitectura)
- [Servicios y Dependencias](#servicios-y-dependencias)
  - [Zookeeper](#zookeeper)
  - [Kafka Broker](#kafka-broker)
  - [Kafka UI](#kafka-ui)
  - [Init Kafka](#init-kafka)
  - [Keycloak](#keycloak)
  - [API](#api)
  - [Worker](#worker)
  - [Front-End](#front-end)
- [Uso](#uso)
  - [Instalacion](#instalacion)
  - [Comandos Útiles](#comandos-útiles)
  - [Primer uso](#primer-uso)
    - [Kafka Ui](#kafka-ui-1)
    - [Autenticación](#autenticación)
    - [Creación de Jobs](#creación-de-jobs)
    - [Visualización de resultados](#visualización-de-resultados)
  - [Ejemplos de uso](#ejemplos-de-uso)
    - [Fichero sin parámetros](#fichero-sin-parámetros)
    - [Fichero con parámetros](#fichero-con-parámetros)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Desarrolladores
- Mario Jaramillo Sizalima
- Edson López Caal

## Funcionamiento
Una vez el usuario se haya autenticado en el sistema, podrá tener acceso a las funcionalidades, a partir de los datos ingresados en la interfaz de usuario, se procede a generar un job o evento conteniendo los datos como la url del repositorio de donde se descargaran los ficheros, el nombre del fichero a ejecutar, así como la definición de parámetros de ejecución de ser necesarios. Este evento es propagado por los servicios hasta llegar a un `Worker`, quien será el encargado de la descarga de ficheros y su ejecución. Por último se responde con un nuevo evento conteniendo el resultado obtenido.

### Limitaciones y Consideraciones
- El sistema solo es capaz de trabajar con repositorios públicos, si estos llegaran a necesitar de algún tipo de autenticación, su ejecución no podrá ser realizada.
- Se admite la ejecución únicamente de ficheros shell o bash `(.sh)`.
- Las configuraciones default del sistema, contemplan la ejecución en un entorno de desarrollo, por lo que no se contempla el uso de certificados `TLS` ni dominios, para establecer conexiónes seguras. 
## Arquitectura
El sistema hace uso de `Kafka` como servidor de mensajeria para eventos, conectados a este se encuentra tanto la `API` y `Worker`, ambos servicios se encargan del intercambio de eventos haciendo uso de dos canales de comunicación `topics`. Por su parte la API haciendo uso de `Graphql`, recibe e informa de todos los eventos a la interfaz de usuario `Front-End`. La seguridad y autenticación al sistema es controlado a travéz de `Keycloak`, quien se comunica con la interfaz de usuario `Front-End` para las validaciones correspondientes. En cuanto a funcionalidad el `Worker` es el único con acceso a los sistemas de gestión de versiones para la descarga y ejecución de los ficheros. 
<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/arquitecture.jpg?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="300">
</p>

## Servicios y Dependencias

| Servicio                  | Acceso Externo                                   |
| ------------------------- | -------------------------------------------------|
| Kafka Broker              | [localhost:9092](localhost:9092)                 |
| Kafka UI                  | [http://localhost:5001](http://localhost:5001)   |
| Keycloak                  | [http://localhost:5002](http://localhost:5002)   |
| API                       | [http://localhost:4000](http://localhost:4000)   |
| Front-End                 | [http://localhost:3000](http://localhost:3000)   |

### Zookeeper
Apache zookeeper es un servicio centralizado para mantener la información de configuración, nombrar, proporcionar sincronización distribuida y proporcionar servicios grupales.

Variables de Entorno:

| NOMBRE                    | DESCRIPCION                           | VALOR DEFAULT                               |   
| ------------------------- | ------------------------------------- | ------------------------------------------- |
| ZOOKEEPER_CLIENT_PORT     | Puerto para conexión con servidor     | `2181`                                      |
| ZOOKEEPER_TICK_TIME       | Intervalo para Heart beat             | `2000`                                      |

### Kafka Broker
Apache Kafka es una plataforma distribuida para la transmisión de datos que permite no solo publicar, almacenar y procesar flujos de eventos de forma inmediata, sino también suscribirse a ellos.

Variables de Entorno:

| NOMBRE                                          | DESCRIPCION                              | VALOR DEFAULT                                                        |   
| ----------------------------------------------- | -----------------------------------------| -------------------------------------------------------------------- |
| KAFKA_BROKER_ID                                 | Identificador del broker                 | `1`                                                                  |
| KAFKA_ZOOKEEPER_CONNECT                         | Host de Zookeeper                        | `zookeeper:2181`                                                     |
| KAFKA_LISTENER_SECURITY_PROTOCOL_MAP            | Protocolos de seguridad                  | `PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT`                   |
| KAFKA_ADVERTISED_LISTENERS                      | Listeners admitidos                      | `PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://kafka-broker:29092` |
| KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR          | Factor de replicacion para topics        | `1`                                                                  |
| KAFKA_TRANSACTION_STATE_LOG_MIN_ISR             | Mínimo de replicas para transacciones    | `1`                                                                  |
| KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR  | Factor de replicacion para transacciones | `1`                                                                  |
| KAFKA_LOG_RETENTION_MS                          | Tiempo de retención de transacciones(ms) | `600000`                                                             |

### Kafka UI
Interfaz gráfica para visualizar estado de servidor `Kafka`. Topics, consumers, mensajes y distintas métricas pueden ser administradas desde este servicio. 

Variables de Entorno:

| NOMBRE                            | DESCRIPCION                           | VALOR DEFAULT                               |   
| --------------------------------- | ------------------------------------- | ------------------------------------------- |
| KAFKA_CLUSTERS_0_NAME             | Nombre Kafka server                   | `local`                                     |
| KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS | Host Kafka server                     | `kafka-broker:29092`                        |
| KAFKA_CLUSTERS_0_ZOOKEEPER        | Host servicio Zookeeper               | `2181`                                      |

### Init Kafka
Servicio utilizado para la configuración inicial del servidor Kafka, se encarga de la creación de los `Topics` necesarios para el sistema.

Variables de Entorno:

| NOMBRE                            | DESCRIPCION                                            | VALOR DEFAULT             |   
| --------------------------------- | ------------------------------------------------------ | ------------------------- |
| KAFKA_BROKER                      | Host Kafka server                                      | `kafka-broker:29092`      |
| TOPIC_NAME                        | Nombre del topic destinado para jobs                   | `git-events`              |
| TOPIC_NAME_RESULTS                | Nombre del topic destinado para los resultados de jobs | `git-events-results`      |

### Keycloak
Es un sistema de administración de identidades de código abierto para la autenticación de inicio de sesión único. Contiene un sistema de login con SSO(Single Sign On), Social login, Active Directory, LDAP, etc. Se encuentra configurado para otorgar sesiones de máximo 30 minutos, las modificaciones requeridas pueden realizarse desde el panel de administración mediente el usuario Administrador.

Variables de Entorno:

| NOMBRE                            | DESCRIPCION                                            | VALOR DEFAULT             |   
| --------------------------------- | ------------------------------------------------------ | ------------------------- |
| KEYCLOAK_ADMIN                    | Nombre de usuario Administrador                        | `guest`                   |
| KEYCLOAK_ADMIN_PASSWORD           | Password para usuario Adminstrador                     | `guest`                   |

### API
Servicio en NodeJs, encargado de la comunicación de eventos entre el `Front-end` y el servidor `Kafka`. Para ello implementa internamente un servidor `Apollo`, encargado de las consultas `Graphql`.

Variables de Entorno:

| NOMBRE                            | DESCRIPCION                                            | VALOR DEFAULT             |   
| --------------------------------- | ------------------------------------------------------ | ------------------------- |
| NODE_ENV                          | Modo de ejecución                                      | `development`             |
| APP_NAME                          | Identificador del servicio                             | `API`                     |
| PORT                              | Puerto para exponer el servicio                        | `4000`                    |
| LOG_FILENAME                      | Nombre de fichero log                                  | `api`                     |
| ENABLE_LOG_FILE                   | Habilitar generación de logs para fichero              | `false`                   |
| KAFKA_CLIENT_ID                   | Identificador de cliente kafka                         | `git-events`              |
| KAFKA_BROKER                      | Host servidor kafka                                    | `kafka-broker:29092`      |
| KAFKA_TOPIC                       | Nombre de topic para jobs                              | `git-events`              |
| KAFKA_TOPIC_RESULTS               | Nombre de topic para resultados de jobs                | `git-events-results`      |
| KAFKA_GROUP_ID.                   | Identificador de grupo kafka                           | `api-consumer`            |

### Worker
Servicio en NodeJs, encargado de la ejecución de los jobs delegados. Su función es conectarse al sistema de control de versiones indicado en el job, descargar el repositorio y ejecutarlo. También es capaz de producir eventos con la respuesta de los jobs ejecutados.

Variables de Entorno:

| NOMBRE                            | DESCRIPCION                                             | VALOR DEFAULT             |   
| --------------------------------- | ------------------------------------------------------- | ------------------------- |
| NODE_ENV                          | Modo de ejecución                                       | `development`             |
| APP_NAME                          | Identificador del servicio                              | `WORKER`                  |
| LOG_FILENAME                      | Nombre de fichero log                                   | `worker`                  |
| ENABLE_LOG_FILE                   | Habilitar generación de logs para fichero               | `false`                   |
| KAFKA_CLIENT_ID                   | Identificador de cliente kafka                          | `git-events`              |
| KAFKA_BROKER                      | Host servidor kafka                                     | `kafka-broker:29092`      |
| KAFKA_TOPIC                       | Nombre de topic para jobs                               | `git-events`              |
| KAFKA_TOPIC_RESULTS               | Nombre de topic para resultados de jobs                 | `git-events-results`      |
| KAFKA_GROUP_ID.                   | Identificador de grupo kafka                            | `worker-consumer`         |
| FILE_DIR                          | Directorio para almacenamiento temporal de repositorios | `./filesr`                |

### Front-End
Servicio en ReactJs, utilizado como interfaz de usuario para generación y visualización de Jobs. Se caracteriza por utilizar el servicio keycloak como autenticador para ingreso al sitema.

Variables de Entorno:

| NOMBRE                            | DESCRIPCION                                             | VALOR DEFAULT             |   
| --------------------------------- | ------------------------------------------------------- | ------------------------- |
| WATCHPACK_POLLING                 | Habilitación de Watcher para directorios                | `true`                    |
| CHOKIDAR_USEPOLLING               | Habilitación de Polling para cambios                    | `true`                    |
| PUBLIC_URL                        | URL para exponer el servicio                            | `http://localhost:3000`   |
| REACT_APP_KEYCLOAK_REALM          | Nombre del realm asociado al cliente                    | `SAD`                     |
| REACT_APP_KEYCLOAK_URL            | Host del servidor keycloak                              | `http://localhost:5002`   |
| REACT_APP_KEYCLOAK_CLIENT_ID      | Identificador del cliente keycloak                      | `sad-git-executor`        |
| REACT_APP_GRAPHQL_ENDPOINT        | Host Servicio API                                       | `http://localhost:4000`   |
| NODE_ENV                          | Modo de ejecución                                       | `development`             |

## Uso
No hace falta ningúna configuración para el funcionamiento de este servicio, salvo la creación de un usuario para el acceso, dicho registro puede realizarse desde la interfaz de usuario al momento del login en la interfaz de usuario `Front-End`. El fichero `docker-compose.yml` contiene el valor por defecto de todas las variables de entorno, de igual forma se encuentra configurado para realizar todas las configuraciones iniciales en cada servicio para su correcto funcionamiento. Durante la primera ejecución del sistema se creara un nuevo directorio `volumes`, este es utilizado por los servicios para persistencia de las configuraciones temporales.
### Instalacion
1. Navegar hasta el directorio raíz del proyecto
2. Ejecutar el siguiente comando:

```
docker-compose up -d
```
3. Esperar a que todos los sevicios se encuentren ejecutandose, tomar nota que el servicio `Init Kafka` estará activo unicamente por un corto tiempo al inicio del sistema, ya que es utilizado solo para configuraciones iniciales.

4. Alcanzado este punto, el sistema ya esta listo para su uso
   
<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/docker-compose-containers.png?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="320">
</p>

### Comandos Útiles
- Instalar
```
docker-compose up -d
```
- Actualizar configuración de un servicio
```shell
docker-compose up -d --no-deps --build {service-name}
```
- Visualización de logs
```
docker container logs { id container } -f
```
- Acceder a la terminal de un contenedor
```shell
docker-compose exec {service-name} sh
```
- Eliminar
```shell
docker-compose down --rmi all
```
- Reiniciar
```shell
docker-compose restart
```
- Detener:
```shell
docker-compose stop
```
- Remover:
```shell
docker-compose down -v
```

### Primer uso
#### Kafka Ui
Dashboard para visualización y administración del servidor `Apache Kafka`. En el se pueden observar `topics`, `consumers`, `messages` y demás configuraciones del servidor.

<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/kafka-ui.png?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="190">
</p>

#### Autenticación
Este apartado corresponde al paso de autenticación dentro de la interfaz de usuario `Front-End`. En el se puede tanto autenticarse como un usuario previamente registrado o proceder con el respectivo registro si somos un nuevo usuario.

<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/register.png?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="800">
</p>

#### Creación de Jobs
Esta página `"/"` es la encargada de la toma de datos para ejecutar un fichero, es aquí donde el usuario debe proceder a llenar los campos requeridos par la creación de un nuevo Job.

<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/git-executor.png?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="400">
</p>

#### Visualización de resultados
Esta página `"/reader"` se encarga de mostrar el resultado de los jobs previamente generados, en el detalle podremos observar el tiempo demorado en segudos, los datos ingresados y el resultado final de su ejecución. 

<p align="center">
<img src="https://github.com/elopez-upv/mq-architecture/blob/main/public/git-reader.png?raw=true"
  alt="Size Limit comment in pull request about bundle size changes"
  width="800" height="400">
</p>

### Ejemplos de uso
Se procede a plantear las dos variantes de jobs que pueden ser ejecutados por el sistema. Para ello se tiene un repositorio test con los ficheros necesarios. 
#### Fichero sin parámetros
- Datos para Job:
```
Git Url:            https://github.com/elopez-upv/test.git
Nombre Ejecutable:  test.sh
Parámetros:         "Dejar vacío"
```
#### Fichero con parámetros
- Datos para Job:
```
Git Url:            https://github.com/elopez-upv/test.git
Nombre Ejecutable:  test-params.sh
Parámetros:         -f 'Test User' -a 25 -u test
```

## Tecnologías Utilizadas

- [NodeJs](https://nodejs.dev/)
- [ReactJs](https://reactjs.org/)
- [Apache Kafka](https://kafka.apache.org/)
- [keycloak](https://www.keycloak.org/)
- [Graphql](https://graphql.org/)
