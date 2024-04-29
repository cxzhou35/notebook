---
comments: true
---

# Shell

!!! abstract "Abstract"
    记录一些 Shell 相关的内容

## 安装

## 基本配置

## 常用命令

## 代码片段

??? tip "xargs: 一次执行多个Shell脚本"
    ```shell title="test.sh" linenums="1"
    echo 1
    echo 3
    echo 5
    echo 7
    echo 9
    ```

    ```shell
    cat test.sh | xargs -I {} bash -c "{}"
    ```

??? tip "crontab: 自定义定时脚本"
    ```scss title="crontab format"
    * * * * *
    - - - - -
    | | | | |
    | | | | +----- day of the week (0 - 6) (Sunday=0)
    | | | +---------- month (1 - 12)
    | | +--------------- day of the month (1 - 31)
    | +-------------------- hour (0 - 23)
    +------------------------- minute (0 - 59)
    ```

    ```shell title="crontab example"
    # example: 每周日 12 点执行
    0 12 * * 0 echo "Hello World"
    ```

    可以通过这个[在线工具](https://crontab.guru/)来生成 crontab 的时间配置

    crontab 命令：
    ```shell
    crontab -e # 编辑当前用户的定时任务

    crontab -l # 列出当前用户的所有任务

    crontab -r # 删除所有任务，包括重要的系统任务
    ```
