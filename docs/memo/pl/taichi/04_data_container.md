---
comments: true
---

# Data Containers

## Taichi Fields

Taichi中的`Field`是一个全局的数据容器，从Python scope和Taichi scope都能访问，但必须在Python scope中才能声明一个`Field`，`Field`的维度最高为8

### 标量 fields

Scalar field存储的是标量，是最基本的field

- 一个0D标量 field是单个标量
- 一个1D标量 field是由标量组成的一个一维数组
- 一个ND标量 field是由标量组成的一个N维数组

#### 声明

可以通过`ti.field(dtype, shape)`来声明一个标量 field，`dtype`是Taichi中的基本类型，`shape`是一个由整数构成的元组，此外，可以通过`field.dtype`和`field.shape`来获得对应的属性

> 每当声明一个field后，Taichi会自动将其元素初始化为0

```python
f_0d = ti.field(ti.f32, shape=())  # 0D field
f_1d = ti.field(ti.i32, shape=9)  # A 1D field of length 9

f1[None] = 1  # Must use `None` to access a 0D field
f2[0] = 1  # Use 0 to access a 1D field of length 1

f_2d = ti.field(int, shape=(3, 6))  # A 2D field in the shape (3, 6)
```

!!! warning "Warning"
    Taichi的fields不支持切片，以下行为都是不被允许的

    ```python
    for x in f_2d[0]:  # Error! You tried to access its first row，but it is not supported
        ...


    f_2d[0][3:] = [4, 5, 6]  # Error! You tried to access a slice of the first row, but it is not supported
    ```

可以通过`field.fill()`的方式用一个给定值填充field

```python
x = ti.field(int, shape=(5, 5))
x.fill(1)  # Sets all elements in x to 1

@ti.kernel
def test():
    x.fill(-1)  # Sets all elements in x to -1
```

### 向量 fields

#### 声明

可以通过`ti.Vector.field(n, dtype, shape)`来声明一个`n`维的向量 field，`dtype`和`shape`与标量 field一样

```python
# Declares a 3x3 vector field comprising 2D vectors
f = ti.Vector.field(n=2, dtype=float, shape=(3, 3))


box_size = (300, 300, 300)  # A 300x300x300 grid in a 3D space

# Declares a 300x300x300 vector field, whose vector dimension is n=4
volumetric_field = ti.Vector.field(n=4, dtype=ti.f32, shape=box_size)
```

访问0维的向量 field中的元素同样需要用`None`来作为索引

```python
x = ti.Vector.field(n=3, dtype=ti.f32, shape=()) # A 0D vector field

item1 = x[None][0]
```

### 矩阵 fields

#### 声明

可以通过`ti.Matrix.field(N, M, dtype, shape)`来声明一个`NxM`的矩阵 field，`dtype`和`shape`与标量 field一样

```python
# Declares a 300x400x500 matrix field, each of its elements being a 3x2 matrix
tensor_field = ti.Matrix.field(n=3, m=2, dtype=ti.f32, shape=(300, 400, 500))
```

访问0维的矩阵 field中的元素同样需要用`None`来作为索引

```python
x = ti.Matrix.field(n=3, m=4, dtype=ti.f32, shape=()) # A 0D matrix field

item1 = x[None][0, 1]
```

对Matrix的操作会在编译时展开，下面是一个例子

```python
import taichi as ti
ti.init()

a = ti.Matrix.field(n=2, m=3, dtype=ti.f32, shape=(2, 2))
@ti.kernel
def test():
    for i in ti.grouped(a):
        # a[i] is a 2x3 matrix
        a[i] = [[1, 1, 1], [1, 1, 1]]
        # The assignment is unrolled to the following at `compile time`:
        # a[i][0, 0] = 1
        # a[i][0, 1] = 1
        # a[i][0, 2] = 1
        # a[i][1, 0] = 1
        # a[i][1, 1] = 1
        # a[i][1, 2] = 1
```

因此尽量不要使用太大的field dimension，而是使用比较大的matrix shape

!!! example "Example"

    ```python
    # not recommend
    m = ti.Matrix.field(64, 32, dtype=ti.f32, shape=(3, 2))

    # recommend
    m = ti.Matrix.field(3, 2, dtype=ti.f32, shape=(64, 32))
    ```

### 结构体 fields

#### 声明

可以通过`ti.Struct.field(members, shape)`来声明一个结构体 field，其中`members`是字典类型的变量，`shape`是元组类型的变量

Taichi的结构体 field有两种访问元素的方式：index-first和name-first

!!! example "Example"

    ```python
    # Sets the position of the first particle in the field to [0.0, 0.0, 0.0]
    particle_field[0].pos = vec3(0) # particle_field is a 1D struct field, pos is a 3D vector

    # Sets the mass of the first particle in the field to 1.0
    particle_field.mass[0] = 1.0

    # Sets all mass of the particles in the struct field to 1.0
    particle_field.mass.fill(1.0)
    ```

### 组织高效的数据布局

高效数据布局的核心原则是局部性，一般高效的数据布局至少有以下特点之一

- 稠密的数据结构
- 小范围数据循环
- 顺序加载与存储数据

Taichi中提供了灵活的语句`ti.root.X`用于描述更复杂的数据组织

- 声明一个0维filed

```python
x = ti.field(ti.f32)
ti.root.place(x)

# is# equivalent to:
x = ti.field(ti.f32, shape=())
```

- 声明一个形状为3的1维field

```python
x = ti.field(ti.f32)
ti.root.dense(ti.i, 3).place(x) # `ti.i`

# is equivalent to:
x = ti.field(ti.f32, shape=3)
```

- 声明一个形状为(3, 4)的2维field

```python
x = ti.field(ti.f32)
ti.root.dense(ti.ij, (3, 4)).place(x) # `ti.ij`
# is equivalent to:
x = ti.field(ti.f32, shape=(3, 4))

# nest use of dense is also available
x = ti.field(ti.f32)
ti.root.dense(ti.i, 3).dense(ti.j, 4).place(x)
```

上述用嵌套`dense`语句构建的二维数组和用`ti.field`构建的二维数组不完全相同，虽然这两种语句都会产生相同形状的二维数组，但它们的`SNodeTree`层级不一样，如下所示

<figure markdown>
  ![](./assets/snode_diff.png){ width="600" }
  <figcaption></figcaption>
</figure>

`ti.root.X`语句逐步将`Field`的形状绑定到对应的轴，通过多个语句的嵌套，我们可以构建一个更高维度的`Field`

### AoS和SoA

AoS全称array of structures（数组结构体），SoA全称structure of arrays（结构体数组）， 一个带有4个像素和3个颜色通道的RGB图像：AoS布局存储为`RGBRGBRGBRGB`，而SoA布局存储为`RRRRGGGGBBBB`，选择AoS还是SoA布局很大程度上取决于field的访问模式

可以通过`ti.root.X`语句构建AoS和SoA

```python
# SoA field
x = ti.field(ti.f32)
y = ti.field(ti.f32)
ti.root.dense(ti.i, M).place(x)
ti.root.dense(ti.i, M).place(y)

#  address: low ................................. high
#           x[0]  x[1]  x[2] ... y[0]  y[1]  y[2] ...

# AoS field
x = ti.field(ti.f32)
y = ti.field(ti.f32)
ti.root.dense(ti.i, M).place(x, y)

#  address: low .............................. high
#           x[0]  y[0]  x[1]  y[1]  x[2]  y[2] ...
```

### 管理内存占用

一般情况下，Taichi对内存的分配和销毁是不可见的，不过，我们有时会需要手动管理内存分配

针对这种情况，Taichi 提供了`FieldsBuilder`，用于支持field相关内存的手动分配和销毁，`FieldsBuilder`和`ti.root`有相同的声明 API，但还需要在所有声明之后调用`finalize()`，`finalize()`返回一个`SNodeTree`对象用于处理随后的内存销毁

!!! example "Example"

    ```python
    import taichi as ti
    ti.init()

    @ti.kernel
    def func(v: ti.template()):
        for I in ti.grouped(v):
            v[I] += 1

    fb1 = ti.FieldsBuilder()
    x = ti.field(dtype=ti.f32)
    fb1.dense(ti.ij, (5, 5)).place(x)
    fb1_snode_tree = fb1.finalize()  # Finalizes the FieldsBuilder and returns a SNodeTree
    func(x)
    fb1_snode_tree.destroy()  # Destruction

    fb2 = ti.FieldsBuilder()
    y = ti.field(dtype=ti.f32)
    fb2.dense(ti.i, 5).place(y)
    fb2_snode_tree = fb2.finalize()  # Finalizes the FieldsBuilder and returns a SNodeTree
    func(y)
    fb2_snode_tree.destroy()  # Destruction
    ```

## Taichi Ndarray

Taichi ndarray和numpy ndarray很相近，但是它的底层内存是由Taichi架构分配的，并且由Taichi的运行时管理

Taichi ndarray会分配一个连续的内存块，并允许与外部库进行直接的数据交换(numpy ndarray/torch tensor)，相比Taichi field来说，更适合用于稠密的数据

可以用`ti.ndarray`来声明一个Taichi ndarray，`dtype`可以是基本类型，也可以是matrix/vector这些，要注意**只能在Python scope中**声明一个ndarray，并且其中的所有元素会被初始化为0

```python
arr = ti.ndarray(dtype=ti.math.vec3, shape=(4, 4))
```

### Ndarray的常用运算


- 用标量值填充ndarray

```python
arr.fill(1.0)
```

- 从Python scope读取/写入ndarray元素

```python
# Returns a ti.Vector, which is a copy of the element
print(arr[0, 0]) # [1.0, 1.0, 1.0]

# Writes to an element
arr[0, 0] = [1.0, 2.0, 3.0] # arr[0, 0] is now [1.0, 2.0, 3.0]

# Writes to a scalar inside vector element
arr[0, 0][1] = 2.2  # arr[0, 0] is now [1.0, 2.2, 3.0]

```

- Ndarrays的数据拷贝

```python
import copy
# Copies from another ndarray with the same size
b = ti.ndarray(dtype=ti.math.vec3, shape=(4, 4))
b.copy_from(arr)  # Copies all data from arr to b

# Deep copy
c = copy.deepcopy(b)  # c is a new ndarray that has a copy of b's data.

# Shallow copy
d = copy.copy(b)  # d is a shallow copy of b; they share the underlying memory
d[0, 0][0] = 1.2  # This mutates b as well, so b[0, 0][0] is now 1.2
```

- 与NumPy ndarrays的数据交换

```python
# to_numpy returns a NumPy array with the same shape as d and a copy of d's value
e = d.to_numpy()

# from_numpy copies the data in the NumPy array e to the Taichi ndarray d
e.fill(10.0)  # Fills in the NumPy array with value 10.0
d.from_numpy(e)  # Now d is filled in with 10.0
```

在Taichi kernel中传入Taichi ndarrays，传入的是**变量的引用**

```python
@ti.kernel
def foo(A: ti.types.ndarray(dtype=ti.f32, ndim=2)):
    do_something(A)
```

> 其中`dtype`和`ndim`参数如果没有指定的话，Taichi会从输入的ndarray推断这两个值，如果指定了那么Taichi会验证传入的ndarray是否和参数声明一致，不一致会报错

外部数组可以传入Taichi kernel，而无需进一步的类型转换

```python
ti.init(arch=ti.cuda)

@ti.kernel
def add_one(arr : ti.types.ndarray(dtype=ti.f32, ndim=2)):
    for i in ti.grouped(arr):
        arr[i] = arr[i] + 1.0

arr_np = np.ones((3, 3), dtype=np.float32)
add_one(arr_np) # arr_np is updated by taichi kernel

arr_torch = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]], device='cuda:0')
add_one(arr_torch) # arr_torch is updated by taichi kernel
```

Kernel编译时的ndarray模板复用（不指定ndarray的类型和大小）

```python
@ti.kernel
def test(arr: ti.types.ndarray()):
    for I in ti.grouped(arr):
        arr[I] += 2

a = ti.ndarray(dtype=ti.math.vec3, shape=(4, 4))
b = ti.ndarray(dtype=ti.math.vec3, shape=(5, 5))
c = ti.ndarray(dtype=ti.f32, shape=(4, 4))
d = ti.ndarray(dtype=ti.f32, shape=(8, 6))
e = ti.ndarray(dtype=ti.math.vec3, shape=(4, 4, 4))
test(a) # New kernel compilation
test(b) # Reuse kernel compiled for a
test(c) # New kernel compilation
test(d) # Reuse kernel compiled for c
test(e) # New kernel compilation
```

> 这个编译规则也适用于NumPy或PyTorch的数据

## 空间稀疏数据结构

在Taichi中，可以使用`SNode`组成类似于VDB和SPGrid的数据结构，Taichi的空间稀疏数据结构有以下优点

- 可以使用索引进行访问
- 迭代时自动并行
- 自动优化内存访问


