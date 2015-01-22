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

It can be handy to run the debug adapter in its own shell and leave it attached so you can see its output as requests are made:

```bash
$ docker run -ti --rm --name powerstrip-debug \
    --expose 80 \
    binocarlos/powerstrip-debug
```

## run powerstrip

First create a powerstrip configuration with the debug adapter:

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

## chaining the debug container

It is useful to insert the debug container after other adapters so you can see the effect they are having on docker API calls.

This is done by the ordering of the adapters in the powerstrip config file.

The following example will log requests before AND after they are modified by the [weave](https://github.com/binocarlos/powerstrip-weave.git) adapter:

```yaml
endpoints:
  "POST /*/containers/create":
    pre: [debug, weave, debug]
  "POST /*/containers/*/start":
    post: [debug, weave, debug]
adapters:
  weave: http://weave/v1/extension
  debug: http://debug/v1/extension
```

## licence

MIT