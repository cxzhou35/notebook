---
comments: true
---

# Stream

## Stream Abstraction

Convert between **string-represented data** and the real thing.

<div align=center><img src="https://gitee.com/vercent_zhou/picgo-md/raw/master/image/202301101510893.png" style="zoom:90%" alt="fig1"></div>

`stream`: an **abstraction** for input/output. Streams convert between data and the **string representation of data**.

## Standard iostreams

- `cin`: Standard input stream(buffered)
- `cout`: Standard output stream(buffered)
- `cerr`: Standard error stream(unbuffered)
- `clog`: Standard error stream(buffered)

### Output Streams

`std::out` is an output stream. It has type `std::ostream`.

- Can only send data using the `<<` operator.
- Converts data of any type into **string** and sends it to the stream.
- std::cout is the output stream that goes to the **console.**

!!! example "Example"
    ```cpp
    std::cout << 5 << std::endl;
    // converts int value 5 to string "5"
    // send "5" to the console output stream
    ```

### Input Streams

`std::cin` is an input stream. It has type `std::istream`.

- Can only send data using the `>>` operator.
- Receives a **string** from the stream and converts it to **data**.
- std::cin is the input stream that gets input from the **console**.
- The result of `cin >> ` expression is `bool`, we can use if (cin >> ...) to check input.

!!! example "Example"
    ```cpp
    int x;
    string str;
    std::cin >> x >> str;
    //reads exactly one int then one string from console
    ```

About **std::in**

- Each `>>` only reads until the next **whitespace(tab, space, newline)**.
- Everything after the ﬁrst whitespace **gets saved(saved in buffer)** and used the next time `std::cin >>` is called.
- Once an error is detected, the input stream's **fail bit** is set, and it will no longer accept input.
- ==Types matter==
	- **Stream stops reading at any whitespace or any invalid character for the type.**

!!! question "Question"
    **Why >> with cin is a nightmare?**

    - cin reads the ==entire line into the buffer== but extracts whitespace-separated tokens.
    - Trash in the buffer will make cin not prompt the user for input at the right time.
    - When cin fails, all future cin calls fail too.

Think of a std::istream as a sequence of characters.

!!! example "Example"
    ```cpp
    int age; double hourlyWage;
    cout << "Please enter your age: ";
    cin >> age;
    cout << "Please enter your hourly wage: ";
    cin >> hourlyWage;
    //what happens if first input is 2.17?

    cout << "\nage: " << age << endl;
    cout << "hourlyWage : " << hourlyWage << endl;
    // age: 2
    // hourlyWage: 0.17
    ```

When we first input 2.17, the `2` is read and put into variable `age`, but the std::istream is still reading(not meet whitespace), and save `.17` in buffer, when the second `std::cin >>` called, write `.17` into variable `hourlyWage`.

## State bits

We can use state bits to check if the stream has errors.

- `Good bit`: ready for read/write
- `Fail bit`: previous operation failed, all future operations frozen
	- type mismatch
	- file can't be opened
	- seekg failed
- `EOF bit`: previous operation reached the end of buffer content
- `Bad bit`: external error, likely irrecoverable

!!! example "Example"
    ```cpp
    std::istringstream iss(str);
    cout << iss.good() << endl;
    cout << iss.fail() << endl;
    cout << iss.eof() << endl;
    cout << iss.bad() << endl;
    ```

## std::getline()

- Defined in header `<string>`
- Used to read a string or a line from an **input stream**.
- Signature: `istream& getline(istream& is, string& str, char delim);`
	- **is:** Stream to read from
	- **str:** Place where input from stream is stored
	- **delim:** When to stop reading (`\n` as default)
-  **How it works**
	- Clears contents in **str**
	- Extracts chars from **is** and stores them in **str** until:
		- End of ﬁle buffer of **is,** sets ==EOF bit== (can be checked using `is.eof()`)
		- Next char in **is** is **delim(default is \\n)**, extracts but does **not store delim**
		- **str** max size is reached, sets ==FAIL bit== (can be checked using `is.fail()`)

!!! tip "Hint"
    Notice getline(istream& stream, string& line) takes in both parameters by ==reference==!

**How to use std::getline()**

!!! example "Example"
    ```cpp
    string line;
    std::getline(cin, line); // now line has changed
    std::cout << line << std::endl;
    ```

Compare `>>` with `geline`

- `>>` reads up to the next whitespace character and **does not go past that whitespace character.**
- `getline` reads up to the next delimiter (by default, '\n'), and **does go past that delimiter.**

## File Streams

### Output File Streams

- Defined in header `<fstream>`
- Have type `std::ofstream`
- Can only send data using the `<<` operator.
- Converts data of any type into a **string** and sends it to the **ﬁle stream**.
- Must initialize your own ==ofstream object linked to your ﬁle==.

!!! example "Example"
    ```cpp
    std::ofstream out_file("out.txt");
    // out_file is now an ofstream that outputs to out.txt
    out_file << 5 << std::endl; // out.txt now contains 5
    ```

### Input File Streams

- Defined in header `<fstream>`
- Have type `std::ifstream`.
- Only receives strings using the `>>` operator.
- Receives **strings from a ﬁle** and converts it to data of any type.
- Must initialize your own **ifstream object** linked to your ﬁle.

!!! example "Example"
    ```cpp
    std::ifstream in_file("out.txt");
    // in_file is now an ifstream that reads from out.txt string str;

    string str;
    in_file >> str; // first word in out.txt goes into str
    ```

### File mode

- `ios::app`: append
- `ios::ate`: at end
- `ios::in`: open file for reading
- `ios::out`: open file for writing
- `ios::trunc`: truncate, if the file exists, empty the file contents when open the file
- multi mode
	- we can use `|` to combine two modes, like ==ios::out | ios::ate==

## String Streams

- Input stream: `std::istringstream`
	- Give any data type to the **istringstream,** it’ll store it as a string.
	==(data type -> string)==
- Output stream: `std::ostringstream`
	- Make an **ostringstream** out of a **string,** read from it word/type by word/type.
	==(string -> data type)==

!!! example "Example"
    ```cpp
    // ostringstream
    std::ostringstream oss("Hello world");
    cout << oss.str() << endl;
    // Hello world
    oss << "Game over";
    cout << oss.str() << endl;
    // Game overld

    // Q: why?
    // A: The buffer doesn't refresh.

    // istringstream
    Student reverseJudgementCall(string judgement) {
    // input: “Sarah age 21, rocks”
    std::istringstream converter(judgement);
    string fluff;
    int age;
    bool lovesCpp;
    string name;
    converter >> name; // Sarah
    converter.ignore() // pass over a character -> age
    converter >> age; // 21
    converter >> fluff; // ,
    string cool;
    converter >> cool; // rocks
    if (cool == "rocks")
        return Student{name, age, "bliss"};
    else
        return Student{name, age, "misery"};
    }
    ```
