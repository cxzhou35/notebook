---
comments: true
---

# Conda

!!! abstract "Abstract"
    这里记录了一些 Conda 相关的内容

## 安装

安装以 [Miniconda](https://docs.conda.io/en/latest/miniconda.html) 为例，Anaconda 的安装步骤差不多，但是 Miniconda 要更精简一些

### Linux

```sh
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh # 下载安装脚本

chmod +x Miniconda3-latest-Linux-x86_64.sh # 添加可执行权限

./Miniconda3-latest-Linux-x86_64.sh # 安装

```

安装完成之后，需要在`~/.zshrc`或`~/.bashrc`中写入 Conda 的环境变量

假设 miniconda 路径为`~/miniconda3/`，记为`conda_path`

```sh
__conda_setup="$('conda_path/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "conda_path/etc/profile.d/conda.sh" ]; then
        . "conda_path/etc/profile.d/conda.sh"
    else
        export PATH="conda_path/bin:$PATH"
    fi
fi
unset __conda_setup
```

> 这里用`conda_path`是为了表示方便，请将`conda_path`替换为安装 miniconda 的路径

写入之后，可以用`source ~/.zshrc`或`source ~/.bashrc`命令来使环境变量生效，

在终端中输入`conda info`如果有信息输出则说明已经配置完成
>
### Mac

Mac 安装 miniconda 和 Linux 的安装步骤类似，通过 shell 脚本安装的方式就不赘述了。另外一种安装方式就是通过 [Homebrew](https://brew.sh/) 安装

```sh
brew install --cask miniconda
```

安装后同样需要按照 Linux 中的步骤来配置环境变量，之后在终端中输入以下指令来初始化 Conda

```sh
conda init "$(basename "${SHELL}")"
```

## 常用命令

```sh
conda --version or conda -V # 查看 conda 的版本

conda update conda # 更新 conda

conda info # 查看当前环境下的 conda 信息

conda create -n env_name [python=3.x] # 创建环境，可以指定 Python 版本

conda activate env_name # 激活 env_name 环境

conda deactivate # 退出当前环境

conda remove -n env_name --all # 删除 env_name 环境

conda env list # 列出所有的环境

conda install package_name # 在当前环境中安装包

conda list # 列出当前环境中的所有 Python 包

conda search [-c channel_address] [-f] [packages] # 搜索指定的包

conda clean -a # 清除缓存和没有依赖的包
```

## 常用配置

Windows 系统的 Conda 配置文件位于`C:\Users\username\.condarc`，Linux 或者 Mac 系统 Conda 的配置文件位于`~/.condarc`或`~/.conda/.condarc`，也可以使用`conda config --set ...`指令来添加或更改对应的设置，可以在配置文件中**修改下载源**从而加快下载的速度

我的常用设置(用的是阿里源)：

```sh
report_errors: true
auto_activate_base: false
ssl_verify: true
show_channel_urls: true
channels:
  - http://mirrors.aliyun.com/anaconda/pkgs/main
  - http://mirrors.aliyun.com/anaconda/pkgs/r
  - http://mirrors.aliyun.com/anaconda/pkgs/msys2
```
