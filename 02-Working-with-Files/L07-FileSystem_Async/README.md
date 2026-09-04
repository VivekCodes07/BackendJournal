# Node.js File System — From Callbacks to Promises to Async/Await

The Node.js `fs` (File System) module is used to work with files and directories.

We can use it to:

* Create files
* Read files
* Write to files
* Update files
* Delete files
* Work with directories

---

# 1. Why is File System Code Asynchronous?

File operations can take some time, especially when working with large files.

Node.js does not want the entire application to stop while waiting for a file operation to finish.

Instead, it starts the operation and can continue handling other work.

```text
Start file operation
        ↓
Node.js continues other work
        ↓
File operation finishes
        ↓
We handle the result
```

The important question is:

> How do we handle the result when the operation finishes?

This is where the evolution from **Callbacks → Promises → async/await** comes in.

---

# 2. The Evolution

Asynchronous JavaScript evolved through different ways of handling the result of an operation:

```text
Callback
   ↓
Promise
   ↓
.then() / .catch()
   ↓
async/await
```

The actual operation can remain the same.

What changes is **how we handle the asynchronous result**.

---

# 3. Example Task

Let's use the same task for all three approaches.

Suppose we have a file:

```text
user.txt
```

containing:

```text
Vivek
```

We want to perform these operations:

```text
1. Read user.txt
        ↓
2. Get the username
        ↓
3. Create greeting.txt using the username
        ↓
4. Read greeting.txt
        ↓
5. Print the final result
```

The important part is that these operations are **dependent on each other**.

We cannot create `greeting.txt` until we have the username.

We cannot read `greeting.txt` until it has been created.

---

# 4. Callback Approach

The older Node.js approach commonly used **callbacks**.

```js
import fs from "fs";

fs.readFile("user.txt", "utf8", (err, username) => {
    if (err) {
        console.log(err);
        return;
    }

    const message = `Hello ${username}`;

    fs.writeFile("greeting.txt", message, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        fs.readFile("greeting.txt", "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(data);
        });
    });
});
```

The flow is:

```text
read user.txt
      ↓
username available
      ↓
create greeting.txt
      ↓
file created
      ↓
read greeting.txt
      ↓
print result
```

Each operation is placed inside the callback of the previous operation.

---

# 5. Why Can Callbacks Become Difficult?

Look at the structure:

```text
readFile()
   └── writeFile()
          └── readFile()
                 └── console.log()
```

As the number of dependent operations increases, the nesting increases.

This can lead to what is commonly called:

**Callback Hell**

Example:

```js
operation1(() => {
    operation2(() => {
        operation3(() => {
            operation4(() => {
                // More operations...
            });
        });
    });
});
```

The problem is not that callbacks are bad.

The problem is that **deeply nested callbacks can become difficult to read and maintain**.

This led to Promises.

---

# 6. Promise Approach

A **Promise** represents the eventual result of an asynchronous operation.

Node.js provides Promise-based versions of many `fs` operations.

```js
import fs from "fs/promises";

fs.readFile("user.txt", "utf8")
    .then((username) => {
        const message = `Hello ${username}`;

        return fs.writeFile("greeting.txt", message);
    })
    .then(() => {
        return fs.readFile("greeting.txt", "utf8");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

The flow becomes:

```text
read user.txt
      ↓
   username
      ↓
write greeting.txt
      ↓
 file created
      ↓
read greeting.txt
      ↓
    data
      ↓
console.log()
```

The code is flatter than the callback version.

---

# 7. What is `.then()` Doing?

When we call:

```js
fs.readFile("user.txt", "utf8")
```

using the Promise-based API, it returns a **Promise**.

That Promise eventually settles.

```text
Pending
   ↓
Operation finishes
   ↓
Fulfilled / Rejected
```

If the operation succeeds:

```js
.then()
```

handles the result.

If the operation fails:

```js
.catch()
```

handles the error.

Think:

```text
readFile()
    ↓
  Promise
    ↓
 ┌───────────────┐
 ↓               ↓
Success         Error
 ↓               ↓
.then()        .catch()
```

---

# 8. Creating vs Consuming a Promise

This is an important distinction.

There are two different things:

```text
Creating a Promise
        ↓
Consuming a Promise
```

## Creating a Promise

When we create our own Promise:

```js
const myPromise = new Promise((resolve, reject) => {
    resolve("Hello");
});

myPromise.then((data) => {
    console.log(data);
});
```

Here, **we created the Promise**.

Therefore, we are responsible for telling the Promise whether the operation succeeded or failed.

```js
resolve("Hello");
```

means:

> The operation was successful, and this is the result.

And:

```js
reject(error);
```

would mean:

> The operation failed.

The flow is:

```text
new Promise()
      ↓
resolve(data)
      ↓
Promise fulfilled
      ↓
.then()
      ↓
data
```

---

# 9. Why Don't We Use `resolve()` With `fs.readFile()`?

Look at our code:

```js
fs.readFile("user.txt", "utf8")
    .then((username) => {
        console.log(username);
    });
```

We don't write:

```js
resolve(username);
```

Why?

Because **we did not create the Promise**.

Node.js already created and manages the Promise internally.

Conceptually, Node.js is doing something similar to:

```js
const promise = new Promise((resolve, reject) => {
    // Node.js reads the file...

    // If reading succeeds:
    resolve(fileData);

    // If reading fails:
    reject(error);
});
```

We simply consume the Promise:

```js
fs.readFile("user.txt", "utf8")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

So:

```text
Node.js creates the Promise
          ↓
Node.js calls resolve() / reject()
          ↓
We consume the Promise
          ↓
.then() / .catch()
```

### Remember

> **The creator of a Promise uses `resolve()` and `reject()`. The consumer uses `.then()`, `.catch()`, or `await`.**

---

# 10. Why Do We Use `return` in Promise Chains?

Look at:

```js
.then((username) => {
    const message = `Hello ${username}`;

    return fs.writeFile("greeting.txt", message);
})
```

`fs.writeFile()` returns a Promise.

We return that Promise so the next `.then()` waits for it to finish.

```text
.then()
   ↓
return Promise
   ↓
Promise finishes
   ↓
next .then()
```

Without returning the Promise, the next `.then()` would not properly wait for that operation.

This is called:

**Promise Chaining**

---

# 11. Promise Chaining

The same task can be written like this:

```js
import fs from "fs/promises";

fs.readFile("user.txt", "utf8")
    .then((username) => {
        return fs.writeFile(
            "greeting.txt",
            `Hello ${username}`
        );
    })
    .then(() => {
        return fs.readFile("greeting.txt", "utf8");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

Think:

```text
Promise 1
   ↓
.then()
   ↓
Promise 2
   ↓
.then()
   ↓
Promise 3
   ↓
.then()
```

---

# 12. async/await

Promises made asynchronous code cleaner, but JavaScript provides an even cleaner syntax:

**async/await**

The same task becomes:

```js
import fs from "fs/promises";

const createGreeting = async () => {
    try {
        const username = await fs.readFile("user.txt", "utf8");

        const message = `Hello ${username}`;

        await fs.writeFile("greeting.txt", message);

        const data = await fs.readFile("greeting.txt", "utf8");

        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

createGreeting();
```

Now the dependency is very easy to see:

```text
await read user.txt
        ↓
    username
        ↓
create message
        ↓
await write greeting.txt
        ↓
     file created
        ↓
await read greeting.txt
        ↓
      data
        ↓
    console.log()
```

The code reads almost like normal instructions.

---

# 13. What Does `async` Mean?

We wrote:

```js
const createGreeting = async () => {

};
```

The `async` keyword tells JavaScript that this function works with asynchronous operations and allows us to use `await`.

An `async` function always returns a **Promise**.

---

# 14. What Does `await` Mean?

Consider:

```js
const username = await fs.readFile("user.txt", "utf8");
```

`fs.readFile()` returns a Promise.

`await` waits for that Promise to settle and gives us its result.

Conceptually:

```text
Start reading user.txt
        ↓
Wait for the Promise
        ↓
File reading finishes
        ↓
Give me the username
        ↓
Continue to the next line
```

This makes dependent operations very easy to read.

---

# 15. `await` and Promises

Remember that:

```js
const username = await fs.readFile("user.txt", "utf8");
```

is still working with a Promise.

The relationship is:

```text
fs.readFile()
      ↓
   Promise
      ↓
    await
      ↓
  username
```

So `async/await` did not replace Promises.

It gives us a cleaner way to **consume Promises**.

---

# 16. Important: `await` Does Not Block Node.js

When we write:

```js
const username = await fs.readFile("user.txt", "utf8");
```

we are not freezing the entire Node.js application.

The current `async` function pauses at that point while the asynchronous operation completes.

Node.js can continue handling other work.

```text
async function
      ↓
    await
      ↓
function pauses here
      ↓
Node.js handles other work
      ↓
file operation finishes
      ↓
function continues
```

---

# 17. Error Handling Evolution

The error-handling style also changed.

### Callback

```js
import fs from "fs";

fs.readFile("user.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});
```

```text
Callback → check err
```

### Promise

```js
import fs from "fs/promises";

fs.readFile("user.txt", "utf8")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

```text
Promise → .catch()
```

### async/await

```js
import fs from "fs/promises";

const readFile = async () => {
    try {
        const data = await fs.readFile("user.txt", "utf8");

        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

readFile();
```

```text
async/await → try/catch
```

---

# 18. Same Operation — Three Approaches

Now compare the same dependent task.

## Callback

```js
import fs from "fs";

fs.readFile("user.txt", "utf8", (err, username) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.writeFile(
        "greeting.txt",
        `Hello ${username}`,
        (err) => {
            if (err) {
                console.log(err);
                return;
            }

            fs.readFile("greeting.txt", "utf8", (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(data);
            });
        }
    );
});
```

## Promise + `.then()`

```js
import fs from "fs/promises";

fs.readFile("user.txt", "utf8")
    .then((username) => {
        return fs.writeFile(
            "greeting.txt",
            `Hello ${username}`
        );
    })
    .then(() => {
        return fs.readFile("greeting.txt", "utf8");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
```

## async/await

```js
import fs from "fs/promises";

const createGreeting = async () => {
    try {
        const username = await fs.readFile("user.txt", "utf8");

        await fs.writeFile(
            "greeting.txt",
            `Hello ${username}`
        );

        const data = await fs.readFile(
            "greeting.txt",
            "utf8"
        );

        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

createGreeting();
```

The logic is exactly the same.

Only the way we express the asynchronous flow changes.

---

# 19. The Actual Evolution

### Callback

The next operation goes inside the callback.

```text
Operation 1
    ↓
Callback
    ↓
Operation 2
    ↓
Callback
    ↓
Operation 3
```

### Promise

The next operation goes into the next `.then()`.

```text
Operation 1
    ↓
.then()
    ↓
Operation 2
    ↓
.then()
    ↓
Operation 3
```

### async/await

We await each dependent operation.

```text
Operation 1
    ↓
await
    ↓
Operation 2
    ↓
await
    ↓
Operation 3
```

---

# 20. The Most Important Connection

Do not think:

```text
Callback
Promise
async/await
```

are completely unrelated concepts.

Instead:

```text
             Asynchronous Operation
                       ↓
             How do I handle the result?
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
          Callback           Promise
                                ↓
                         ┌──────┴──────┐
                         ↓             ↓
                      .then()     async/await
```

The key relationship is:

> **async/await is built on top of Promises.**

So when we write:

```js
const username = await fs.readFile("user.txt", "utf8");
```

`fs.readFile()` is returning a Promise.

`await` is simply giving us a cleaner way to consume that Promise.

---

# 21. My Mental Model

Whenever I have dependent asynchronous operations, I should think:

```text
Operation 1
     ↓
I need its result
     ↓
Operation 2
     ↓
I need its result
     ↓
Operation 3
```

Then understand how each style handles the dependency.

### Callback

> "When this finishes, call this function."

### Promise

> "When this Promise finishes, run the next `.then()`."

### async/await

> "Wait for this Promise here, then continue."

---

# 22. Final Picture

```text
                    ASYNCHRONOUS OPERATION
                              ↓
                   Operation takes time
                              ↓
                   We need its result
                              ↓
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
          Callback         Promise        async/await
              ↓               ↓               ↓
          callback          .then()         await
                              ↓
                           .catch()
                              ↓
                       try/catch with
                       async/await
```

The goal of all three approaches is the same:

> **Perform an asynchronous operation and handle its result.**

The syntax evolved to make dependent asynchronous code easier to read and maintain.

```text
Callback
   ↓
More nesting

Promise
   ↓
Promise chaining

async/await
   ↓
Cleaner, sequential-looking code
```

---

# 23. What I Should Remember

```text
fs
→ Node.js File System module

Callback
→ Older way of handling async operations

Promise
→ Represents the eventual result of an async operation

resolve()
→ Marks our own Promise as successful and provides its result

reject()
→ Marks our own Promise as failed and provides the error

.then()
→ Handles a successful Promise result

.catch()
→ Handles a rejected Promise

async
→ Allows a function to use await

await
→ Waits for a Promise and gives its result

try/catch
→ Handles errors with async/await

async/await
→ Cleaner syntax built on top of Promises
```

## Core Idea

> **An asynchronous operation finishes later, and we need a way to handle its result.**

Callbacks were the older way.

Promises gave us a better representation of the future result.

`async/await` gave us cleaner syntax for consuming those Promises.

And the most important distinction:

```text
CREATE a Promise
      ↓
resolve() / reject()

CONSUME a Promise
      ↓
.then() / .catch() / await
```
