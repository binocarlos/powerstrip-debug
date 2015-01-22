powerstrip-debug
================

A [Powerstrip](https://github.com/ClusterHQ/powerstrip) adapter that logs requests to stdout.

## install

```bash
$ docker build -t binocarlos/powerstrip-debug .
```

## run the adapter

```bash
$ docker run -d --name powerstrip-debug \
    --expose 80 \
    binocarlos/powerstrip-debug
```

## run powerstrip

First create a powerstrip configuration:

```bash
$ mkdir -p ~/powerstrip-demo
$ cat > ~/powerstrip-demo/adapters.yml <<EOF
endpoints:
  "POST /*/containers/create":
    pre: [debug]
  "POST /*/containers/*/start":
    post: [debug]
adapters:
  debug: http://debug/v1/extension
EOF
```

And then run the powerstrip container and link it to the powerstrip-debug container:

```bash
$ docker run -d --name powerstrip \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/powerstrip-demo/adapters.yml:/etc/powerstrip/adapters.yml \
  --link powerstrip-debug:debug \
  -p 2375:2375 \
  clusterhq/powerstrip
```

## run containers

Now you can use the normal docker client to run containers.

First you must export the `DOCKER_HOST` variable to point at the powerstrip server:

```bash
$ export DOCKER_HOST=tcp://127.0.0.1:2375
```

Now - all docker requests are logged to stdout of the powerstrip-debug container:

```bash
$ docker run --rm ubuntu echo hello
```

## licence

MIT