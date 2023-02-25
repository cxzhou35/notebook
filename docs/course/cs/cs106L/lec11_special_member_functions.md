# TOC
- [[#Special member functions|Special member functions]]
	- [[#Special member functions#Copy and copy assignment|Copy and copy assignment]]
	- [[#Special member functions#Default and delete|Default and delete]]
	- [[#Special member functions#Move and move assignment|Move and move assignment]]
		- [[#Move and move assignment#r-value reference|r-value reference]]
		- [[#Move and move assignment#move assignment|move assignment]]
		- [[#Move and move assignment#std::move|std::move]]

## Special member functions

There are six special member functions, These functions are generated only when they're called:
- Default constructor: Takes **no parameters** and creates a new object.
- Destructor: Called when an object goes out of scope.
- Copy constructor: Creates a **new object** as a **member-wise copy** of another.
- Copy assignment operator: Assigns an **already existing object** to another.
- Move constructor
- Move assignment operator

![f|C|650](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301161055555.png)

We don't have to write out any of these. They all have **default versions** that are generated automatically.

### Copy and copy assignment

By default, the copy constructor will create **copies of each member variable**. This is ==member-wise copying==. Many times, we will want to create a copy that **does more than just copies the member variables**.

`Deep copy`: An object that is a complete, independent copy of the original.

```cpp
// copy constructor
Type::Type(const Type& other)

// copy assignment
Type::operator=(const Type& other)
```

### Default and delete

`default` and `delete` are key words  in c++.

Declaring any user-deﬁned constructor will **make the default disappear**. If we need to use the default special member function we need add `=default`.
`=default`  is only used for **special member functions** of the class that have **no default parameters**. Can be defined either inside the class body **(inline)** or outside the class body **(out-of-line)**.

```ad-example
```cpp
class Student {
 public:
  // member function
  Student(int age);
  Student() = default; // defulated default constructor.
  ~Student();

 private:
  int age;
};

Student::Student(int age) : age(age) {}
Student::~Student() {}

Student s0; // error if there is no defaulted function
Student s1(19);
Student s2(29);
```

Setting a **special member function** to `=delete` removes its functionality. Thus we can selectively **allow functionality** of special member functions. 
**`=delete` can not be used at `destructor`.**

```ad-example
```cpp
class Student {
 public:
  // member function
  Student(int age);
  Student() = default; // defulated default constructor.
  ~Student();

  Student(const Student& rhs) = delete; // delete the copy constructor
  Student& operator=(Student& other) = delete; // delete the copy assignment

  // ~Student() = delete; // error, destructor can't be deleted

 private:
  int age;
};

Student::Student(int age) : age(age) {}
Student::~Student() {}

Student s1(19);
Student s2(s1); // error, copy constructor has been deleted

Student s3;
s3 = s2; // error, copy assignment has been deleted
```

### Move and move assignment

Move constructors and move assignment operators will perform **"memberwise moves"**.
Deﬁning a move assignment operator **prevents generation of a move copy constructor**, and vice versa.

Move constructors and operators are only generated if:
- No copy operations are declared.
- No move operations are declared.
- No destructor is declared.

If we want to explicitly support move operations, we can set the operators to `default`:

![f|C|650](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301161304369.png)

When the item on the right of the `=` is an **r-value** we should use move assignment.
r-values are always about to die, so we can steal their resources.

#### r-value reference
Different with l-value reference, we use `&&` to present **r-value reference**.

#### move assignment

```ad-example
```cpp
vector<T>& operator=(vector<T>&& other)
{
	if (&other == this) return *this;
	_size = other._size;
	_capacity = other._capacity;
 
	//we can steal the array
	delete[] _elems;
	_elems = other._elems;
	return *this;
}
```

#### std::move
`std::move` function mainly **converts a l-value into a r-value reference**.
Use `std::move` to force the use of other **types' move assignments and constructors**.

```ad-example
```cpp
vector<T>& operator=(vector<T>&& other)
{
	if (&other == this) return *this;
	_size = std::move(other._size);
	_capacity = std::move(other._capacity);
 
	//we can steal the array
	delete[] _elems;
	_elems = std::move(other._elems);
	return *this;
}

vector<string> vec1 = {"hello", "world"}; // vec1 = {"hello", "world"}
vector<string> vec2 = std::move(vec1); // vec2 = {"hello", "world"}
								  // vec1 = {}
		  
vec1.push_back("game"); // vec1 = {"game"}

// `vec1` is a l-value, we use `std::move` to convert it
// also break the variable `vec1`
```

After a variable is moved via `std::move`, **it should never be used until it is reassigned to a new variable**.

```ad-warning
**Don't use `std::move` outside of class definitions, never use it in application code.**
```

