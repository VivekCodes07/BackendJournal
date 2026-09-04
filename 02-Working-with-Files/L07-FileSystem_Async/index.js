/*
    PHASE 1: CALLBACK APPROACH

    I start with callbacks because this is the traditional
    way Node.js handles asynchronous operations.

    My task is:

    1. Read the username from user.txt
    2. Create a greeting using the username
    3. Write it to greeting.txt
    4. Read greeting.txt
    5. Print the result

    The important thing I want to notice is that every step
    depends on the previous step.

    Because callbacks are used, I have to put the next
    operation inside the previous callback.

    This is what eventually leads to Callback Hell.
*/

import fs from "node:fs";

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


/*
    PHASE 2: PROMISE + .then()

    Now I want to solve the nesting problem.

    fs/promises gives me methods that already return Promises,
    so I don't have to create a Promise myself.

    Instead of nesting the next operation inside a callback,
    I can return the Promise and continue with .then().

    The flow becomes:

    readFile()
        ↓
    .then()
        ↓
    writeFile()
        ↓
    .then()
        ↓
    readFile()
        ↓
    .then()

    This keeps the code flat and easier to follow.
*/

import fsPromises from "node:fs/promises";

fsPromises
    .readFile("user.txt", "utf8")
    .then((username) => {
        const message = `Hello ${username}`;

        return fsPromises.writeFile("greeting.txt", message);
    })
    .then(() => {
        return fsPromises.readFile("greeting.txt", "utf8");
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });


/*
    WHY AM I USING return INSIDE .then()?

    writeFile() returns a Promise.

    I return that Promise because the next .then()
    should wait for writeFile() to finish.

    Without return, the Promise chain would not properly
    wait for that operation.

    So I can remember it like this:

    return Promise
        ↓
    next .then() waits for it
*/


/*
    PHASE 3: ASYNC / AWAIT

    Promises made the code cleaner, but I still have
    multiple .then() blocks.

    async/await lets me write the same Promise-based
    logic in a more natural top-to-bottom way.

    I can think about the task exactly as I would perform it:

    Read username
        ↓
    Create greeting
        ↓
    Write greeting
        ↓
    Read greeting
        ↓
    Print result

    await gives me the resolved value of a Promise.
*/

async function createGreeting() {
    try {
        const username = await fsPromises.readFile(
            "user.txt",
            "utf8"
        );

        const message = `Hello ${username}`;

        await fsPromises.writeFile(
            "greeting.txt",
            message
        );

        const data = await fsPromises.readFile(
            "greeting.txt",
            "utf8"
        );

        console.log(data);

    } catch (err) {
        console.log(err);
    }
}

createGreeting();


/*
    CREATING vs CONSUMING A PROMISE

    This is one of the most important things I need
    to understand.

    When I create a Promise myself, I use:

        resolve()
        reject()

    because I am controlling that Promise.

    Example:

        new Promise((resolve, reject) => {
            resolve("Done");
        });

    But fsPromises.readFile() already returns a Promise.

    I am only consuming that Promise.

    So I use:

        .then()
        .catch()
        await

    I don't use resolve() here because Node.js is already
    handling it internally.

    My simple rule:

    CREATE a Promise
        ↓
    resolve() / reject()

    CONSUME a Promise
        ↓
    .then() / .catch() / await
*/


/*
    FINAL UNDERSTANDING

    The actual task never changed.

    Read user.txt
        ↓
    Get username
        ↓
    Create greeting
        ↓
    Write greeting.txt
        ↓
    Read greeting.txt
        ↓
    Print result

    Only the way I handle the asynchronous flow changed.

    Callback:

        "When this finishes, run this function."

    Promise:

        "When this finishes, continue with .then()."

    Async/Await:

        "Wait for this Promise, then continue."

    async/await is therefore not a completely different
    asynchronous system.

    It is a cleaner way of working with Promises.
*/