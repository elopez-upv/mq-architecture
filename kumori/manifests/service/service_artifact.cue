package service

import (
  f ".../frontend:component"
  w ".../worker:component"
)

#Artifact: {
  ref: name: "mq-architecture"

  description: {

    //
    // Kumori Component roles and configuration
    //

    // Configuration (parameters and resources) to be provided to the Kumori
    // Service Application.
    config: {
      parameter: {
        language: string
      }
      resource: {}
    }

    // List of Kumori Components of the Kumori Service Application.
    role: {
      frontend: artifact: f.#Artifact
      api: artifact: w.#Artifact
      worker: artifact: w.#Artifact
    }

    // Configuration spread:
    // Using the configuration service parameters, spread it into each role
    // parameters
    role: {
      frontend: {
        config: {
          parameter: {}
          resource: {}
        }
      }

      worker: {
        config: {
          parameter: {
            appconfig: {
              language: description.config.parameter.language
            }
          }
          resource: {}
        }
      }
    }

    //
    // Kumori Service topology: how roles are interconnected
    //

    // Connectivity of a service application: the set of channels it exposes.
    srv: {
      server: {
        api: { protocol: "tcp", port: "4000" }
      }
    }

    // Connectors, providing specific patterns of communication among channels
    // and specifying the topology graph.
    connect: {
      // Outside -> FrontEnd (LB connector)
      serviceconnector: {
        as: "lb"
  			from: self: "api"
        to: frontend: "restapi": _
      }
      // FrontEnd -> Worker (LB connector)
      evalconnector: {
        as: "lb"
        from: frontend: "evalclient"
        to: worker: "evalserver": _
      }
      
    }

  }
}
