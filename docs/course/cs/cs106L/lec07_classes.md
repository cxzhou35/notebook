# TOC
- [[#Classes|Classes]]
	- [[#Classes#Namespaces|Namespaces]]
	- [[#Classes#This keyword|This keyword]]
	- [[#Classes#Constructors|Constructors]]
	- [[#Classes#Array|Array]]
	- [[#Classes#Destructors|Destructors]]
	- [[#Classes#Static member|Static member]]

## Classes

`Class`: A programmerdeﬁned custom type. **An abstraction of an object or data type**.
- An **Object** is an instance of a **Class.**
- When a class is deﬁned, no memory is allocated but when it is **instantiated** (i.e. an object is created) memory is allocated.
- Classes provide their users with a ==public interface== and separate this from a ==private implementation==.

```ad-example
```cpp
class Student {
	public:
		std::string getName();
		void setName(std::string name);
		int getAge();
		void setAge(int age);
 
	private:
		std::string name;
		std::string state;
		int age;
};
```

**Public section:**
- Users of the specific object can directly access anything here.
- Deﬁnes interface for ==interacting with the private member variables==.

**Private section:**
- Usually contains all member variables.
- Users ==can't access or modify anything== in the private section.

###  Namespaces

- Put code into logical groups, to **avoid name clashes**.
- Each class has its own namespace.
- Syntax for calling/using something in a namespace: 
  `namespace_name::name`
- **Function** deﬁnitions with namespaces.
	- Inside the {...} the private member variables for `namespace_name` will be in scope.
	- `std::string Student::getName() {...}`, we can use  private member variables  in this function.

 ### This keyword

`this` is the pointer which points out the **object that calls the member function**. `this->element_name` means "the item in this specific object with name `element_name`. Use this for avoiding naming conﬂicts. 

```ad-example
```cpp
void Student::setName(std::string name){
	this->name = name;
} 
```

### Constructors

- The constructor is called every time ==a new instance is created==
- Deﬁne how the member variables of an object is initialized.
- Use ==initializer lists== for speedier construction.

```ad-example
```cpp
// construction using initializer lists
// no parameters
Student::Student() : name{""}, age{0}, state{""} {}

// with parameters
Student::Student(string name, int age, string state) : name{name}, age{age}, state{state} {}
```

### Array

- Arrays are a primitive type. They are the building blocks of all containers
- Think of array as lists of objects of **ﬁxed size** that you can **index into**.

```cpp
int *intarray;

// initialize an array
int* *intarray = new int[10];

// index into an array
int elem = intarray[0];
```

### Destructors

- Deleteing (almost) always happens in the destructor of a class.
- The destructor is deﬁned using `class_name::~class_name()`
- the destructor is called when the **object goes out of scope**.

### Static member

`Static member` meas this member is **belong to the class** instead of the specific object.

> **static variable must have definition.**

```ad-example
```cpp
class Game {
 public:
  Game(/* args */);
  ~Game(/* args */);
  void setID(int id) { Game::id = id; }
  int getID() { return id; }

 private:
  /* data */
  static int id;
};
```

In this code, `id` is a variable member belong to the class `Game`, if we call `obj.setID(val)`, the variable `Game:：id` wouble be changed.

```ad-example
```cpp
int main(void) {
  Game game1;
  game1.setID(2);
  cout << "game1 id: ";
  cout << game1.getID() << endl; // 2

  Game game2;
  cout << "game2 id: ";
  cout << game2.getID() << endl; // 2
  return 0;
}
```
