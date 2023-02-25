# TOC
- [[#Type safety|Type safety]]

## Type safety

`Type Safety`: The extent to which a language prevents typing errors and guarantees the behavior of programs.

`Undeﬁned Behavior(UB)`: Function could crash, could give us garbage, could accidentally give us some actual value.

`std::optional<T>`: A template class which will either contain a value of type T or contain nothing (expressed as `nullopt`). `std::optional` is a tool that could make this happen: you can return either a value or nothing.

```ad-example
```cpp
int main(){
	std::optional<int> num1 = {}; // num1 does not have a value
	// std::optional num1 = {2};     // type deduction
	num1 = std::optional<int>{1}; // now it does!
	num1 = std::nullopt; // now it doesn't anymore
 
	return 0;
}
```

 `std::optional` interface
 - .value()
	 - returns the **contained value** or throws `bad_optional_access` error
- .value_or(valueType val)
	- returns the contained value or default value(parameter val)
- .has_value()
	- returns true if contained value exists, false otherwise

 `std::optional` "monadic" interface(C++23)
 - .and_then(function f)
	 - returns the result of calling f(value) if contained value exists, otherwise null_opt (f must return optional)
- .or_else(function f)
	- returns value if it exists, otherwise returns result of calling f
- .transform(function f)
	- returns the result of calling f(value) if contained value exists, otherwise null_opt (f must return optional<valueType>)

