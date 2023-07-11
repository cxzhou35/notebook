# Kernels & Functions

## 修饰器

在Taichi中有两个重要的修饰器，`ti.func`和`ti.kernel`，分别代表Taichi function和Taichi kernel，Taichi function和Taichi kernel不由Python的解释器执行，而是由Taichi的JIT编译器执行计算，并部署到并行的多核CPU或GPU上

## function和kernel的区别

Taichi function和kernel的区别如下：

- Taichi kernel是Taichi接管执行任务的入口，可以在程序的任何地方被调用，但是Taichi function只能在Taichi kernel或者其他的Taichi function中被调用

- Taichi kernel中的参数必须声明类型，但是Taichi function中的参数可以不需要声明类型
```python
@ti.func
def def complex_sqr(z): 
    ...
    pass

def paint(t: float):
    ...
    pass
```

- Taichi function支持嵌套，Taichi kernel不支持嵌套，且Taichi不支持Taichi function的递归调用

!!! tip "Tip"
    如果熟悉CUDA编程的话，`ti.func`可以等效为CUDA中的`__device__`，`ti.kernel`可以等效为CUDA中的`__global__`

## 循环的并行运算

Taichi kernel里最外层scope的任何for循环都会自动并行化
```python
@ti.kernel
def fill():
    total = 0
    for i in range(10): # Parallelized
        for j in range(5): # Serialized in each parallel thread
            total += i * j

    if total > 10:
        for k in range(5):  # Not parallelized because it is not at the outermost scope
```

!!! warning "Warning"
    并行计算的循环中不支持`break`语句

    ```python
    @ti.kernel
    def foo():
        for i in x:
            ...
            break # Error!

    @ti.kernel
    def foo():
        for i in x:
            for j in range(10):
                ...
                break # OK!
    ```
