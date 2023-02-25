# TOC
- [[#Iterators|Iterators]]
	- [[#Iterators#What is iterator|What is iterator]]
	- [[#Iterators#Types of iterator|Types of iterator]]
	- [[#Iterators#Ranges|Ranges]]
	- [[#Iterators#Range based for loop|Range based for loop]]
- [[#Pointers|Pointers]]
	- [[#Pointers#What is pointer|What is pointer]]

## Iterators

### What is iterator

**Iterator is a abstraction for a tool that accesses the next or previous element or random access.**

How do we access elements in a container in order?
Containers all implement something called an iterator to do this.
- Iterators let you access **all data** in containers programmatically.
- Iterators allow iteration over **any** container, whether it is ordered or not.
- An iterator has **a certain order**, it "knows" what element will come next.
- Each container has its **own iterator**, which can have different behavior.
- **All iterators implement a few shared operations:**
	- Initializing -> `iter = s.begin();`  **begin() and end() return iterators.**
	- Incrementing -> `iter++;`
	- Dereferencing -> `a = \*iter;`
	- Comparing -> `iter != s.end();`
	- Copying -> `new_iter = iter;`

 Similarities
- Can be created from existing iterator.
- Can be advanced using `++`
- Can be compared with `==` and `!=`

```ad-example
```cpp
std::set<int> myset{1, 2, 3, 4};

// define a iterator like this: 
// container_class_name::iterator iterator_name;
std::set<int>::iterator iter = myset.begin();
cout << *iter << endl; // 1

++iter;
cout << *iter << endl; // 2

if (iter == myset.end()){
	return;
}

// find returns an iterator
std::vector<int> vec{3, 1, 4, 8, 5, 9, 2, 6, 7, 0};
const int elem2find = 5;

auto find_it = std::find(vec.begin(), vec.end(), elem2find);
cout << *find_it << endl; // 5

// map iterator
std::map<int, int> mmap;
for(auto iter = mmap.begin(); iter != mmap.end(); ++iter){
	cout << (*iter).first << " " << (*iter).second << endl;
	// is the same as ...
	cout << iter->first << " " << iter->second << endl;
}
```

### Types of iterator

- `Input and output iterators`: They can perform sequential single-pass input or output operations.
- `Forward iterators`: They have all the functionality of input iterators and if they are not constant iterators also have the functionality of output iterators.
- `Bidrectional iterators`: They are like forward iterators but can also be iterated through backwards.
- `Random-access iterators`: They implement all the functionality of bidirectional iterators, and also have the ability to access ranges non-sequentially.

![f|C|300](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301120954809.png)

- Forward iterators are the **minimum level** of functionality for standard containers.
	- Input iterators can appear on the **RHS (right hand side)** of an `=` operator, like `auto elem = *it;`
	- Output iterators can appear on the **LHS (left hand side)** of an `=` operator, like `*elem = value;`
- Bidirectional iterators can go forward as well as backward.
	- `++it;`
	- `--it;`
- Random-access iterators allow you to **directly access values** without visiting all elements sequentially.
	- `it += 5;` 
 
 ![f|C|300](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301120958920.png) 
 
**Collected by [xyx](https://xuan-insr.github.io/cpp/%E7%90%86%E8%A7%A3%20STL%20-%20%E8%BF%AD%E4%BB%A3%E5%99%A8%E4%B8%8E%E5%87%BD%E6%95%B0%E5%AF%B9%E8%B1%A1/):**
![f|C|500](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301151450358.png)

```ad-example
```cpp
for (auto iter = set.begin(); iter != set.end(); ++iter){
	do something;
}

// dereference the iterator to get element
const auto& elem = *iter;
```

### Ranges

We can iterate through different ranges.

![f|C|550](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301131539497.png)

### Range based for loop

A range based `for` loop is a shorthand for iterator code.
All that is required is that the class contains the member functions `begin()` and `end()` and that its **return value type supports the operators `++,` `*` and `!=` **

```ad-example
```cpp
// for(type variable : container)
std::map<string, int> mmap;
for(auto thing : mmap){
	dosomething(thing.first, thing.second)
}

// the implementation
for (it = mmap.begin(); it != mmap.end(); ++it){
	thing = *it;
	dosomething(thing.first, thing.second)
}

// for structure container (cpp17 extension)
for(auto [key, value] : mmap){
	dosomething(key, value);
}
```

## Pointers

### What is pointer

Variables created in code take up space on the computer. They live in memory at speciﬁc addresses. Pointers reference those memory addresses and not the object themselves.

Pointer can access **memory addresses with &** and **the data at an address/pointer using \***.

```ad-example
```cpp
int val = 18;
int* ptr = &val;

// dereference
cout << *ptr << endl; // 18

// dereference of member variables
struct Student{
	int id;
	string name;
};

Student s1{12, "Alice"};
Student* ptr = &s1;
cout << ptr->id << endl; // 12

std::pair<int, string> game{2, "Death Loop"};
std::pair<int, string>* pgame = &game;
cout << pgame->first << endl; // 2
cout << pgame->second << endl; // Death Loop
```

