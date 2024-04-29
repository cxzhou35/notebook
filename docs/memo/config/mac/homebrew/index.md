---
comments: false
statistics: false
---

# Homrebrew

## 安装

## 基本配置

## 常用命令

## Troubleshooting

??? tip "Fix cleanup old kegs"
    问题描述：<br>
    当执行 `brew cleanup --prune=all` 时，可能会出现如下错误：

    ```shell
    Error: Could not cleanup old kegs! Fix your permissions on: somedir
    ```

    原因：<br>
    `brew` 会删除旧的版本，但是由于权限问题，无法删除

    解决方法：<br>
    修改目录权限
    ```shell
    sudo chown -R "$USER":admin somedir
    ```
