---
comments: true
---

# Initialization and References

## Initialization

`Initialization`: How we provide initial values to variables.

### Uniform initialization

Initialization while we declare a variable.

`Uniform initialization`: Curly bracket initialization. Available for **all types**, immediate initialization on declaration!

- Use uniform initialization to initialize every ﬁeld of **non-primitive typed variables**.

!!! example "Example"
    ```cpp
    Student s{"Sarah", "CA", 21}; // struct

    std::pair<int, string> numSuffix{1, "st"}; // pair

    std::vector<int> vec{1, 3, 5}; // vector

    int x{5}; // int
    string str{"Name"}; //string
    ```

### Structured binding

Initialize dierctly from the contens of a struct.

!!! example "Example"
    ```cpp
    // pair
    auto p = std::make_pair("str", 5);
    auto [a, b] = p;

    // struct
    Student s{"Sarah", 20, "TA"};
    auto [name, age, staff] = s;
    ```

## References

`References`: An alias(another name) for a named variable.

- We can only create references to **variables**.
- The cpp compiler does not allocate separate memory space for references.
- References must have **initialization.**

!!! example "Example"
    ```cpp
    void change_x(int& x){
        x = 0; // changes to x will persist
    }

    void keep_x(int x){
        x = 0;
    }

    change_x(a); // a becomes a reference to x
    keep_x(b); // b becomes a copy of x
    cout << a << endl; // 0
    cout << b << endl; // 100

    std::vector<int> original{1, 2};
    std::vector<int> copy = original;
    std::vector<int>& ref = original;
    // `=` automatically makes a copy, must use `&` to avoid this
    ```

### L-values and R-values

#### L-values

- L-values can appear on the **left or right** of an `=`
- L-values **have names**
- L-values are **not temporary**
- L-values live until the **end of the scope**

#### R-values

- R-values can only appear on the **right** of an `=`
- R-values **don't have names**
- R-values are **temporary**
- R-values live until **the end of the line**

## Const

`const`: keyword indicating a variable, function or parameter **can't be modiﬁed**.

!!! example "Example"
    ```cpp
    std::vector<int> vec{1, 2, 3};
    const std::vector<int> c_vec{7, 8}; // a const variable
    std::vector<int>& ref = vec; // a regular reference
    const std::vector<int>& c_ref = vec; // a const reference

    vec.push_back(3); // OK
    c_vec.push_back(3); // BAD - const
    ref.push_back(3); // OK
    c_ref.push_back(3); // BAD - const
    ```

### Const References

Can't declare **non-const reference to const variable**.

!!! example "Example"
    ```cpp
    const std::vector<int> c_vec{7, 8}; // a const variable

    std::vector<int>& bad_ref = c_vec; // BAD
    const std::vector<int>& good_ref = c_vec; // Fixed
    ```

When do we use **references/const references**?

- If we’re working with a variable that takes up little space in memory (e.g. int, double), we don’t need to use a reference and can just copy the variable.
- If we need to alias the variable to modify it(e.g. in a function), we can use references.
- If we don’t need to modify the variable, but it’s a **big variable (e.g. std::vector)**, we can use const references.

We can return references as well, but note that **the parameter must be a non-const reference to return.**

!!! example "Example"
    ```cpp
    int& front(std::vector<int> & vec){
        return vec[0];
    }

    int main(void){
        std::vector<int> nums{1, 2, 3};
        front(nums) = 4; // vec = {4, 2, 3}
        return 0;
    }
    ```

R-values can be bound to const reference.

!!! example "Example"
    ```cpp
    int foo(const int &a){
        return a + 3;
    }

    int main(void){
        foo(1 + 2); // `1+2` is a r-value, but can be passed in
                    // as const reference.
    }
    ```

### Const pointers

Const pointer means this pointer is unchangeable, but what the pointer points to is changeable.

!!! example "Example"
    ```cpp
    using iterator = std::string*;
    using const_iterator = const std::string*;

    // string * const, const ptr to non-const obj
    const iterator it_c = str.begin();
    // ok! it_c is a const pointer to non-const object
    *it_c = "hi" ;
    //not ok! can’t change where a const pointer points
    it_c++;

    // const string*, a non-const ptr to const obj
    const_iterator c_it = str.begin();
    // totally ok! the pointer itself is non-const
    c_it++;
    // not ok! can’t change underlying const object
    *c_it = "hi";
    // allowed! can always read a const object, just can't change
    cout << *c_it << endl;
    ```

### Const functions

`const-interface:` All member functions marked **const** in a class deﬁnition. Objects of type const ClassName may only use the **const-interface.**

!!! warning "Warning"
    Can't call a non-const function in a const function.

Every member function of a class that doesn't change its member variables should be marked const.

!!! example "Example"
    ```cpp
    class Str {
        public:
            size_t size() const;
            bool empty() const;
            const std::string& at(size_t index) const;
        ...
    }
    ```

### Parameter passing rules

Basic parameter passing rules

<div align=center><img src="https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301110920860.png" style="zoom:90%" alt="fig1"></div>

Advanced parameter passing rules

<div align=center><img src="https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301110922497.png" style="zoom:90%" alt="fig2"></div>
