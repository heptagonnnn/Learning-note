#Docker

[toc]

## container

### 创建

docker create
```shell
# 创建容器
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]

# 常用OPTIONS

-i --interactive      
# 创建交互型容器

--name
# 容器名称

--privileged
# 是否获取系统权限

```

docer run
```shell
# 创建并运行容器
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

# 常用options

-i --interactive
# 创建交互型容器

-d --detach
# 创建后台型容器

--name
# 容器名称

--privileged
# 是否获取系统权限
```

###查看
docker ps
```shell
docker ps  [OPTIONS]
# ps---process status---进程状态

-a --all
# 显示所有容器

-n --last int
# 列出最近 int个创建的容器

-l --latest
# 显示最近一个创建的容器

-q --quiet
# 只列出容器id，可用于批量关闭

#######
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
8854192d0a8f        centos:6            "/bin/bash"         8 minutes ago       Up 8 minutes                            centOS_vm2
容器id               创建容器时使用的镜像   容器最后运行的命令     创建时间             容器状态             对外端口              容器名
######

```

### 启动
docker start
```shell
docker start [OPTIONS] CONTAINER [CONTAINER...]


CONTAINER可以是容器的名字，也可以是容器id
# 常用options
```

### 终止

docker stop
```shell
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```
docker kill
```shell
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

### 删除
docker rm
```shell
docker rm [OPTIONS] CONTAINER [CONTAINER...]

# 常用options
-f --force
#强制关闭一个正在运行的container
```
