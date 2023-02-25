# TOC
- [[#Template|Template]]
	- [[#Template#Function Template|Function Template]]
	- [[#Template#Class Template|Class Template]]
	- [[#Template#Generic Programming|Generic Programming]]
	- [[#Template#Template Metaprogramming|Template Metaprogramming]]

## Template

### Function Template

`Function Template`: A function template defines a family of functions. The simple idea is to ==pass data type as a parameter== so that we don’t need to write the same code for different data types.

```ad-example
```cpp
// we need `typename` or `class` keyword 
template <typename T>
// default parameter types
template <typename T=int>
T myMax(T x, T y) {
  return (x > y) ? x : y;
}

// function call
int int_max = myMax<int>(2, 7); // int_max = 7
double double_max = MyMax<double>(2.4, 5.1); // double_max = 5.1

// template arguments deduction
myMax(1, 2); // infers that T is of type `int`
myMax(1.2, 3.9); // infers that T is of type `double`
myMax('a', 'i'); // infers that T is of type `char`
```

**Explicit instantiation**
- specify the type T
- `cout << myMax<int>(2, 3) << endl;`

**Implicit instantiation**
- leave the type for the compiler to deduce
- `cout << myMax(2, 3) << endl`

```ad-hint
**template functions are not compiled until used!**
For each instantiation with different parameters, the compiler generates a new specific version of your template at compile time.
Template code is instantiated at compile time.
```

### Class Template 

`Class Template`: A class that is parametrized over some number of types. A class that is comprised of member variables of a general type/types. Use generic typenames as **placeholders.**

```ad-example
```cpp
template<typename F, typename S>
// we can specify a default value for template arguments
// etc. template<typename F, typename S=int>
class MyPair {
	public:
		First getFirst();
		Second getSecond();
		void setFirst(First f);
		void setSecond(Second f);
 
	private:
		First first;
		Second second;
};

// must announce every member function is templated
template<typename F, typename S>
First MyPair::getFirst(){
	return first;
}

// nested dependent type 
template<typename F, typename S>
typename MyPair<F, S>::iterator MyPair<F, S>::begin() {...}
// here iterator is a `dependent type` in namespace Mypair<F, S>::
// we must add `typename` prior
```

Templated code implementation **should never be in a .cpp file**: your compiler has to see them at the same time as it sees the code that calls them.

### Generic Programming

**Generic Programming** is a programming paradigm for developing **efficient**, **reusable** software libraries.
Generics is the idea to ==allow type (Integer, String, … etc) to be a parameter== to methods, classes and interfaces.
Generics can be implemented in C++ using [Templates](https://www.geeksforgeeks.org/templates-cpp/).

The **advantages** of Generic Programming are
- Code Reusability
- Avoid Function Overloading
- Once written it can be used for multiple times and cases.

### Template Metaprogramming

Normally, code runs during runtime. But with `template metaprogramming(TMP)`, code ==runs once during compile time==. Something runs once during compiling and can be used as many times as you like during runtime.

```ad-example
```cpp
template <unsigned n>
struct Factorial {
	enum {value = n * Factorial<n-1>::value};
};

template<> // template class `specialization`
struct Factorial<0> {
	enum {value = 1};
};

cout << Factorial<10>::value << endl; // print 3628800
```

`struct` is similar to `class` in that it can contain both member variables and member functions.

**the difference of struct and class**
- When using class, the ==members of a class are all private by default==, while when using struct, the ==members of a struct are all public by default==.
- class can be used as a ==template keyword==, while struct cannot.
- class inheritance is ==private inheritance== by default, while struct inheritance is ==public inheritance== by default
