job "lb-nginx-tidal" {
  datacenters = ["dc1"]

  group "tidal" {
    count = 1

    task "lb-nginx-tidal" {
      driver = "docker"

      config {
        image = "registry.gwilken.com/nginx"

        ports = ["http"]

        volumes = [
          "local:/etc/nginx/conf.d",
        ]

        network_mode = "host"
      }

      template {
        data = <<EOF
          log_format upstreamlog '$server_name to: $upstream_addr {$request} '
          'upstream_response_time $upstream_response_time'
          ' request_time $request_time';

          upstream backend {
            {{ range service "tidal-app" }}
              server {{ .Address }}:{{ .Port }};
            {{ else }}server 127.0.0.1:65535; # force a 502
            {{ end }}
          }

          server {
            listen 8080;
            
            access_log /var/log/nginx/nginx-access.log upstreamlog;

            location / {
              proxy_pass http://backend;
            }
          }
          EOF

        destination   = "local/load-balancer.conf"
        change_mode   = "signal"
        change_signal = "SIGHUP"
      }

      service {
        name = "lb-nginx-tidal"
        port = "http"
      }
    }

    network {
      port "http" {
        static = 8080
        // to = 80
        host_network = "public"
      }
    }
  }
}
