# npm 使用问题
[toc]

## mac系统下使用全局安装时权限不足问题

### 原因

npm默认全局安装文件时/usr/local下，此文件夹只有管理员可以操作


### 解决方案

1. sudo npm i -g .....


2. 使用chown指令修改/usr/local文件夹权限
    由于新版macOs上的系统保护机制，此方法已不可使用
