# TOC
- [[#Predicate Functions|Predicate Functions]]
- [[#Lambdas|Lambdas]]
- [[#Functors|Functors]]

## Predicate Functions

Any function that **returns a boolean** value is a `predicate.` A predicate can have **any amount of parameters**.

```ad-example
```cpp
bool isVowel(char c){
	std::string vowel = "aeiou";
	return vowel.find(c) != std::string::npos;
}

// to use predicate
template <typename InputIt, typename UniPred>
int count_occurrences(InputIt begin, InputIt end, UniPred pred){
	int count = 0;
	for (auto iter = begin; iter != end; ++iter){
		if(pred(*iter)) count++;
	}
	return count;
}

std::string str = "xadia";
count_occurrences(str.begin(), str.end(), isVowel);
```

Here `UniPred` is called a `function pointer`.
- Function pointers can be treated just like other pointers.
- They can be passed around like variables as parameters or in template functions.
- They can be called like functions.

## Lambdas

`Lambdas` are **inline,** **anonymous** functions that can know about variables declared in their same scope.
![f|C|500](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301151254010.png)

```ad-example
```cpp
// complete format of lambda expression
[ capture list ] ( params ) mutable(optional) constexpr(optional)(c++17) exception attribute -> return_type { function body } 

int limit = 5;
auto isMoreThan = [limit] (int n) {return n > limit;};
isMoreThan(6); // true

// specify the return type `int` 
auto add = [](int a, int b) -> int { return a + b; };

// assignment is forbidden
auto funa = [] { cout << "A" << endl; };
auto funb = [] { cout << "B" << endl; };

funa = funb;   // error
auto func = funa;   // ok, copy is permitted
```

Lambdas can capture any outside variable by using `[]`, **both by reference and by value**.

![f|C|500](https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301151529087.png)

- Use a lambda when you need a **short function or to access local variables in your function**.
- If you need more logic or overloading, use function pointers.

Whenever a lambda expression is defined, the compiler will automatically generate an **anonymous class**, we call it `closure class`, this class overloads `()` operator of course.

```ad-example
```cpp
class Closure
{
public:
    // ...
    ReturnType operator(params) const { body };
};
```

## Functors

A `functor` is any **class** that provides an implementation of **operator().** They can create **closures** of "customized" functions.

```ad-warning
**Actually, this name never appears in the standard c++, we usually call it `function object`.**
```

`Closure`: a single instantiation of a functor object.

**The STL  standard function object:**
```cpp
std::function<return_type(param_types)> func;
```
