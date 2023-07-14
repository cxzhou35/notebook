---
comments: true
---

# Type System

Taichi是一门静态类型的编程语言，Taichi中的变量类型是在编译时就确定的，一旦声明了变量，就不能再为其分配不同类型的值。

!!! example "Example"
    ```python
    @ti.kernel
    def test():
        x = 1  # x is the integer 1
        x = 3.14  # x is an integer, so the value 3.14 is cast to 3 and x takes the value 3
        x = ti.Vector([1, 1])  # Error!
    ```

> 上述代码的最后一行会报错，因为`ti.Vector()`类型的值不能赋值给变量`x`

Taichi中的`ti.types`模块定义了所有Taichi支持的数据类型，这些数据类型分为两类: 原始类型(primitive)和复合类型(compound)

- 原始类型包括常用的数值数据类型
- 复合类型包括类似数组或类似结构的数据类型，这些类型由多个成员组成，这些成员可以是原始类型，也可以是其他复合类型

## 原始类型


## 复合类型
