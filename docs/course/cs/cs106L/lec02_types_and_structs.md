---
comments: true
---

# Types and Structs

## C++ Fundamental Types

```cpp
int val = 5; //32 bits
char ch = 'F'; //8 bits (usually)
float decimalVal1 = 5.0; //32 bits (usually)
double decimalVal2 = 5.0; //64 bits (usually)
bool bVal = true; //1 bit
```

String type:
```cpp
#include <string> // need `string` library
std::string str = "Sarah"; // double quotes means string

// index into a string and get a character
char character = str[1]; // 'a'
```

## Dynamic vs Static typing

!!! note "Note"
    C++ is a ==statically typed language.==

    `Statically Typed`:
    Everything with a name (variables, functions, etc) is given a type before runtime.(C++)

    `Dynamically Typed`:
    Everything with a name (variables, functions, etc) is given a
    type at runtime based on the thing’s current value.(Python)

    `Runtime`:
    Period when program is executing commands (after compilation, if compiled).

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

Static typing helps us to prevent errors before our code runs.

## Overloading

**Deﬁne two functions with the same name but diﬀerent types.**

!!! example "Example"
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

`struct`: A group of named variables each with their own type. A way to bundle different types together.

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

`std::pair`: An STL built-in struct with two ﬁelds of any type.

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

To avoid specifying the types of a pair, use `std::make_pair(field1, field2)`.

```cpp
std::string suffix;
int num;
std::tie(num, suffix) = std::make_pair(1, "st");
std::cout << num << " " << suffix << std::endl;

// more efficient way in c++17
auto [a, b] = make_pair(3.4, 5);
```

!!! note "Note"
    Use `std::tie(arg1, arg2)` to accept the pair.

## Auto

Type deduction with `auto`.

`auto:` Keyword used in lieu of type when declaring a variable, tells the compiler to deduce the type.

**When to use auto?**

- When you don't care what the type is (iterators)
- When its type is clear from context (templates)
- When you don't know what the type is (lambdas)
- Don't use it unnecessarily for return types like below:
    ```cpp
    auto spliceString(const string& s);
    ```

!!! note "Note"
    auto doesn't mean that the variable doesn't have a type, it means that the type is ==deduced by the compiler==.
