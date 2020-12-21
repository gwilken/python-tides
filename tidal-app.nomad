
job "tidal-app" {
  datacenters = ["dc1"]

  group "tidal" {
    count = 1

    task "tidal-app" {
      driver = "docker"

      env {
        PORT    = "${NOMAD_PORT_http}"
        NODE_IP = "${NOMAD_IP_http}"
      }

      config {
        image = "registry.gwilken.com/tidal:latest"
        args = [
          "python", "server.py"
        ]
        ports = ["http"]
      }
    }

    network {
      port "http" {
        static = 8081
        host_network = "public"
        // host_network = "private"
      }
    }

    service {
      name = "tidal-app"
      // tags = ["urlprefix-/"]
      port = "http"

      check {
        type     = "http"
        path     = "/"
        interval = "2s"
        timeout  = "2s"
      }
    }
  }
}
