---
comments: true
---

# Conda

!!! abstract "Abstract"
    记录一些 Conda 相关的内容

## 安装

以 [Miniconda](https://docs.conda.io/en/latest/miniconda.html) 为例，Anaconda 的安装步骤差不多，但是 Miniconda 要更精简一些

### Linux

```sh
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh # 下载安装脚本

chmod +x Miniconda3-latest-Linux-x86_64.sh # 添加可执行权限

./Miniconda3-latest-Linux-x86_64.sh # 安装
```

安装完成之后，需要在 `~/.zshrc` 或 `~/.bashrc` 中写入 Conda 的环境变量

1. 直接在终端中输入 `conda init zsh` 或 `conda init bash` 初始化

2. 手动写入， 假设 miniconda 的安装路径为`conda_path`

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

写入之后，可以用 `source ~/.zshrc` 或 `source ~/.bashrc` 命令来使环境变量生效，

在终端中输入 `conda info` 如果有信息输出则说明已经配置完成

### macOS

macOS 安装 miniconda 和 Linux 的安装步骤类似，通过 shell 脚本安装的方式就不赘述了<br>
另一种安装方式是通过 [Homebrew](https://brew.sh/) 安装

```sh
brew install --cask miniconda
```

安装后同样需要按照 [Linux安装](#linux) 中的步骤来配置环境变量

## 常用命令

### 1. 查看信息

- `conda info`: 查看当前环境下的 conda 信息
- `conda env list`: 列出所有已安装的环境
- `conda --version or conda -V`: 查看 conda 的版本

### 2. 环境管理

- `conda activate env_name`: 激活 env_name 环境
- `conda deactivate`: 退出当前环境
- `conda create -n env_name [python=3.x]`: 创建新的环境，可以指定 Python 版本（可选）
- `conda remove -n env_name --all`: 删除 env_name 环境

### 3. 包管理

- `conda list`: 列出当前环境中的所有Package
- `conda install package_name`: 在当前环境中安装Package
- `conda search [-c channel_address] [-f] [packages]`: 搜索指定的包

### 4. 其他

- `conda clean -a`: 清除缓存和没有依赖的包
- `conda update conda`: 更新 conda
- `conda env export > environment.yaml`: 导出当前环境的配置，文件名可以自定义
- `conda env create -f environment.yml`: 根据配置文件创建新的环境

### 5. 环境打包

推荐使用[conda-pack](https://conda.github.io/conda-pack/)来打包环境

- 安装：`conda install conda-pack` or `pip install conda-pack`
- 打包环境：`conda pack -n env_name [-o pack_name.tar.gz]`
- 安装环境：`cd conda_env_path & tar -xzf pack_name.tar.gz -C env_name`

## 常用配置

Windows 系统的 Conda 配置文件位于`C:\Users\username\.condarc`，Linux 或者 Mac 系统 Conda 的配置文件位于`~/.condarc`或`~/.conda/.condarc`，也可以使用`conda config --set ...`指令来添加或更改对应的设置，可以在配置文件中**修改下载源**从而加快下载的速度

我的常用配置(用的是[浙大源 :material-arrow-expand:](https://mirror.zju.edu.cn/))：

```yaml
report_errors: true
auto_activate_base: false
ssl_verify: true
show_channel_urls: true
channels:
  - defaults
default_channels:
  - https://mirrors.zju.edu.cn/anaconda/pkgs/main
  - https://mirrors.zju.edu.cn/anaconda/pkgs/r
  - https://mirrors.zju.edu.cn/anaconda/pkgs/msys2
custom_channels:
  - conda-forge: https://mirrors.zju.edu.cn/anaconda/cloud
  - msys2: https://mirrors.zju.edu.cn/anaconda/cloud
  - bioconda: https://mirrors.zju.edu.cn/anaconda/cloud
  - menpo: https://mirrors.zju.edu.cn/anaconda/cloud
  - pytorch: https://mirrors.zju.edu.cn/anaconda/cloud
  - pytorch-lts: https://mirrors.zju.edu.cn/anaconda/cloud
  - simpleitk: https://mirrors.zju.edu.cn/anaconda/cloud
  - nvidia: https://mirrors.zju.edu.cn/anaconda-r
```
