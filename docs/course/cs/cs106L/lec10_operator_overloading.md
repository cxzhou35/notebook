# TOC
- [[#Operators|Operators]]
	- [[#Operators#Operators can't be overloaded|Operators can't be overloaded]]
	- [[#Operators#The way of overloading operators|The way of overloading operators]]
	- [[#Operators#Rules and Philosophy|Rules and Philosophy]]

## Operators

- Just like declaring functions in a class, we can declare operator functionality.
- When we use the operator with our new object, it **performs a custom function or operation**.
- Just like in function overloading, if we give it the same name, it will override the operator’s behavior.

### Operators can't be overloaded
- Scope Resolution: `::`
- Ternary: `?`
- Member Access: `.`
- Pointer-to-member access: `.*`
- Object size, type, and casting: `sizeof()`、`typeid()`、`cast()`

### The way of overloading operators
- Member functions
	- With member function overloading, we **have access to this-> and its private variables**.
- Non-member functions **(this way is preferred by the STL)**
	- It allows the **LHS** to be a non-class type.
	- It allows us to overload operators with **classes we don’t own**.
- The `friend` keyword allows non-member functions or classes to access private information in another class.

```ad-example
```cpp
// first way
class Student{
	public:
		/* ... */
		// member function
		// this function would pass `this` as parameter
		friend bool operator < (const Student& rhs){
			age < rhs.age;
		};

	private:
	/* ... */
	int age;
};

// second way
class Student{
	public:
		/* ... */
		// non-member function
		friend bool operator < (const Student& lhs, const Student& rhs);

	private:
	/* ... */
	int age;
};

// non-member function(global)
bool operator < (const Student& lhs, const Student& rhs) {
	return lhs.age < rhs.age;
};
```

**Non-member function(global function) of operator overloading(global overloading)**

```ad-example
```cpp
struct Time {
  int hours;
  int minutes;
  int seconds;
};

std::ostream& operator<<(std::ostream& out, const Time& time) {
  out << time.hours << ":" << time.minutes << ":" << time.seconds;
  return out;
}

Time t1{12, 20, 56};
cout << t1; // 12:20:56
```

**The implementation of `<<` operator in STL `basic_ostream`.**

```ad-example
```cpp
template<typename _Traits>
  inline basic_ostream<char, _Traits>&
  operator<<(basic_ostream<char, _Traits>& __out, const char* __s)
  {
    if (!__s)
_out.setstate(ios_base::badbit);
    else
_ostream_insert(__out, __s,
	 static_cast<streamsize>(_Traits::length(__s)));
    return __out;
  }
```

```ad-warning
**Be careful with non-member overloading.**
Certain operators, like `new` and `delete,` don’t require a specific type.
```

### Rules and Philosophy

- Meaning should be obvious when you see it.
- Functionality should be **reasonably similar** to corresponding arithmetic operations
- When the meaning isn't obvious, give it a **normal name** instead.

