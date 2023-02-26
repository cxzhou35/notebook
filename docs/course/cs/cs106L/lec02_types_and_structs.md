---
comments: true
---

# 类型和结构

## C++ 基础类型

```cpp
int val = 5; //32 bits
char ch = 'F'; //8 bits (usually)
float decimalVal1 = 5.0; //32 bits (usually)
double decimalVal2 = 5.0; //64 bits (usually)
bool bVal = true; //1 bit
```

字符串类型:
```cpp
#include <string> // need `string` library
std::string str = "Sarah"; // double quotes means string

// index into a string and get a character
char character = str[1]; // 'a'
```

## 动态类型和静态类型

C++ 是一种**静态类型语言**

- **静态类型**: 具有命名(变量，函数等)的内容在运行时之前都具有明确类型 (C++)
- **动态类型**: 具有命名(变量，函数等)的内容**在运行时**根据当前值被指定一个类型 (Python)
- **运行时**: 从程序开始运行到终止的时期 (如果是需要编译的语言, 则在编译期之后)

```python
# CRASH during runtime, can’t divide a string
def div_3(x):
	return x / 3

div_3("hello")
```

```cpp
// Compile error: this code will never run
int div_3(int x){
	return x / 3;
}
div_3("hello");
```

> 静态类型有助于我们在代码运行之前发现和解决错误。

## 重载

定义两个具有相同名称但不同类型的内容(运算符, 函数等), 之后的课程会重点讲解

```cpp
int half(int x) {
    std::cout << “1” << endl;
    return x / 2;
}

double half(double x) {
    cout << “2” << endl;
    return x / 2;
}
```

## Struct

`struct`: 一种由用户自定义的可用数据类型，允许存储不同类型的数据项，是一种将不同类型变量组合在一起的方式

```cpp
struct Student {
	string name; // these are called fields
	string state; // separate these by semicolons
	int age;
};

Student s; // don't have to add `struct` key word
s.name = "Sarah";
s.state = "CA";
s.age = 21; // use . to access fields

// is the same as ...
Student s = {"Sarah", "CA", 21};

// structured binding -- c++17 feature
auto [name, state, age] = s;
```

## Pair

`std::pair`: STL 内置的一种 `struct`，由两个 fields 组成，可以是任何类型

```cpp
// The fields in std::pairs are named `first` and `second`
// initialize
std::pair<int, string> numSuffix{1, "st"};
std::cout << numSuffix.first << numSuffix.second << std::endl;

// is same as ...
std::pair<int, string> numSuffix = std::make_pair(1, "st");

// also same as ...
std::pair<int, string> numSuffix = {1, "st"};
```

为了避免指定 `pair` 的类型，我们可以使用一个函数 `std::make_pair(field1, field2)`

```cpp
std::string suffix;
int num;
std::tie(num, suffix) = std::make_pair(1, "st");
std::cout << num << " " << suffix << std::endl;
```

可以使用另一个函数 `std::tie(arg1, arg2)` 来接收一个 `pair`，在 c++17 中，引入了一个新的特性叫**结构化绑定(Structured Bindings)**，可以帮助我们简化代码

```cpp
// more efficient way in c++17
auto [a, b] = std::make_pair(3.4, 5);
```

## Auto

`auto`: C++ 中的一个关键字，可以做类型自动推导，主要用于两种情况

- 声明变量时根据初始化表达式自动推断该变量的类型
- 声明函数时函数返回值的占位符

**什么时候应该使用 auto?**

- 你不需要在意是什么类型 (iterators)
- 它的类型在上下文中很明确 (templates)
- 你不知道具体是什么类型 (lambdas)
- 不要将它用于返回类型，这会让人很迷惑，像下面的代码一样
    ```cpp
    auto spliceString(const string& s);
    ```

> 使用 auto 并不意味着变量没有类型，该变量的类型是由**编译器自动推导**的
