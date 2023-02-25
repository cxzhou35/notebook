---
comments: true
---

# Containers

`Container`: An object that allows us to collect other objects together and interact with them in some way.

- Organization: Related data can be packaged together.
- Standardization: Common features are expected and implemented.
- Abstraction: Complex ideas made easier to utilize by clients.

## STL Containers

- Familiar: vector, stack, queue, set, map
- Unfamiliar:
	- `array` : An array is the primitive form of a vector, fixed size in a strict sequence.
	- `deque` : A deque is a double ended queue.
	- list: A list is a doubly linked list, can loop through in either direction.

Two types of containers

- Sequence:
	- Containers that can be accessed sequentially.
	- Provides access to **sequences of elements**.
	- Anything with an inherent order goes here.
	- vectors, deques, lists ...
- Associative
	- Containers that don’t necessarily have a sequential order.
	- More easily searched, like maps and sets.
	- maps, sets, unordered maps/sets ...

### Vector

At a high level, a vector is an **ordered collection of elements of the any same type** that can **grow and shrink** in size.

We keep track of a few member variables

- `size`: number of elements in the vector
- `capacity`: space allocated for elements

```cpp
// initialization of vector
std::vector<int> vec1{3, 5}; // {3, 5}
std::vector<int> vec2(3, 5); // {5, 5, 5}

// add element
vec1.push_back(4); // {3, 5, 4}

// get element
int a = vec1.at(0); // a = 3
int b = vec1[1]; // b = 5
```

### Deque

A deque is a double ended queue, can do everything a vector can do, unlike vector, it is possible and fast to `push_front` and `pop_front`.

```cpp
std::deque<int> dq;

// add element
dq.push_front(2); // {2}
dq.push_front(4); // {4, 2}
dq.push_back(3); // {4, 2, 3}

// delete element

dq.pop_front() // {2, 3}
dq.pop_back() // {2}
```

!!! quote "Quote"
    Which to use?

    `vector` is the type of sequence that should be used by **default**, `deque` is the data structure of choice when most insertions and deletions take place at the beginning or at the end of the sequence.

    <p align="right">—— C++ ISO Standard</p>

Choosing sequence containers

![image.png](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301111034175.png)

### Map

Maps are implemented with **key-value pairs with unique keys**, `std::pair<const key, value>`

Based on **ordering property of keys**, keys need to be comparable using `<` operator.

- **Ordered maps/sets** require a **comparison operator** to be deﬁned, keys in sorted order.
- **Unordered maps/sets** require a **hash function** to be deﬁned, keys are unordered.

!!! example "Example"
    ```cpp
    std::map<int, string> mymap;
    string str = mymap.at(key); // throw error if the key  not exists.
    str = mymap[key]; // will not throw error if the key not exists.
    ```

### Multimap

Multimap is an associative container that contains a sorted list of key-value pairs, while **permitting multiple entries with the same key**.

!!! example "Example"
    ```cpp
    std::multimap<int, int> myMMap;
    myMMap.insert({std::make_pair(3, 3)});
    myMMap.insert({3, 12});

    cout << myMMap.count(3) << endl; // 2
    ```

### Set

Sets contains a sorted set of **unique objects** of type `Key`.

!!! example "Example"
    ```cpp
    std::set<string> myset;

    // add element
    myset.insert("game"); // {"game"}
    myset.insert("milk"); // {"game", "milk"}

    // check if contains element
    bool game_exist = myset.count("game"); // true
    bool hello_exist = myset.count("hello"); // false

    // remove element
    myset.earse("milk"); // {"game"}
    ```

## Container Adaptors

Container adaptors are "wrappers" to existing containers

`Wrappers` modify the **interface to sequence containers** and change what the client is allowed to do/how they can interact with the container.

- Commonly used data structures made easy for the client to use.
- Can use different backing containers based on use type.
- Container adaptors wrap existing containers to permit new/restrict access to the interface for the clients.

### Stack

Stack just limits the functionality of a vector/deque to only allow `push_back` and `pop_back`.

### Queue

Queue just limits the functionality of a deque to only allow `push_back`  and `pop_front`.
