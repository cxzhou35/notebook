# TOC
- [[#RALL|RALL]]
- [[#Smart Pointers|Smart Pointers]]

## RAII

`Code path`: A single run-through of the code that the computer would see.

![f|C|600](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301171548872.png)

When a function has an error, it can crash the program.
- This is known as **"throwing an exception"**.
However, we can write code to handle these to let us continue.
- This is **"catching an exception"**.

There are (at least) 23 code paths in the code before
- (1) copy constructor of Person parameter may throw
- (5) constructor of temp string may throw
- (6) call to favorite_food, favorite_drink, ﬁrst (2), last(2), may throw
- (10) operators may be user-overloaded, thus may throw
- (1) copy constructor of string for return value may throw

There are many resources that need to be returned after use.

![f|C|550](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301171552097.png)

`RAII`: Resource Acquisition is Initialization
In RAII
- All resources used by a class **should be acquired in the constructor**
- All resources used by a class **should be released in the destructor**
- Avoid calling `new` and `delete` explicitly

## Smart Pointers

There are three types of `smart (RAII-safe) pointers`:
- std::unique_ptr
	- Uniquely owns its resource, **can't be copied**
	- When a `unique_ptr` goes out of scope, it **frees the memory associated with it**
- std::shared_ptr
	- **Can make copies**, destructed when underlying memory goes out of scope
- std::weak_ptr
	- Models temporary ownership: when an object only needs to be accessed if it exists **(convert to shared_ptr to access)**

```ad-example
```cpp
std::unique_ptr<T> up{new T};
std::unique_ptr<T> up = std::make_unique<T>();

std::shared_ptr<T> sp{new T};
std::shared_ptr<T> sp = std::make_shared<T>();

std::weak_ptr<T> wp = sp; // can only be copy/move constructed(or empty)
```
