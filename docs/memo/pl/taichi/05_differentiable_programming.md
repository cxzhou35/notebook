---
comments: true
---

# Differentiable Programming

Taichi通过`ti.ad.Tape()`或更灵活的`kernel.grad()`语法来实现对梯度的计算

## 使用ti.ad.Tape()

!!! example "Example"

    ```python
    x = ti.field(dtype=ti.f32, shape=(), needs_grad=True)
    y = ti.field(dtype=ti.f32, shape=(), needs_grad=True)

    @ti.kernel
    def compute_y():
        y[None] = ti.sin(x[None])

    with ti.ad.Tape(y):
        compute_y()

    print('dy/dx =', x.grad[None], ' at x =', x[None])
    ```

在上面的代码示例中，有以下几个点需要关注

- 对于要计算梯度的变量，在声明的时候需要设置一个参数`needs_grad=True`，才能通过`with ti.ad.Tape()`语句自动微分

!!! tip "Tip"

    每个变量在声明的时候都要写这个参数会很麻烦，可以通过Taichi的API`ti.root.lazy_grad()`来实现

- `ti.ad.Tape()`中的参数必须是0维的field

## 使用kernel.grad()

和使用`ti.ad.Tape()`不同，在使用`kernel.grad()`之前需要把输出变量的梯度值手动设置为1

!!! example "Example"

    ```python
    import taichi as ti
    ti.init()

    N = 16

    x = ti.field(dtype=ti.f32, shape=N, needs_grad=True)
    loss = ti.field(dtype=ti.f32, shape=(), needs_grad=True)
    loss2 = ti.field(dtype=ti.f32, shape=(), needs_grad=True)

    @ti.kernel
    def func():
        for i in x:
        loss[None] += x[i] ** 2
        loss2[None] += x[i]

    for i in range(N):
        x[i] = i

    # Set the `grad` of the output variables to `1` before calling `func.grad()`.
    loss.grad[None] = 1
    loss2.grad[None] = 1

    func()
    func.grad()
    for i in range(N):
        assert x.grad[i] == i * 2 + 1
    ```

在使用反向的`kernel.grad()`之前应该先运行前向的`kernel()`，避免全局的Taichi field被修改了但是没有做前向运算，导致梯度错误












