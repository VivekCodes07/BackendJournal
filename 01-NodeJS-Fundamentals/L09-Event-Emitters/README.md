# Lesson 09 — Understanding Event Emitters in Node.js

## Why Am I Learning This?

Until now, I've learned how Node.js handles modules, asynchronous operations, HTTP requests, and the process object.

But there's another question I want to understand.

**How can one part of my application notify another part that something has happened without directly calling its function?**

Imagine I'm building a school management backend.

When a student registers, several things might need to happen:

- The application records that the student has registered.
- A welcome email needs to be sent.
- The registration activity needs to be logged.
- Another part of the application might update some statistics.

One approach is to call every function directly inside the registration code. But as the application grows, the registration logic becomes tightly connected to all these other tasks.

What if I could simply announce that a student has registered and let interested parts of the application react to that event?

That's where **Event Emitters** become useful.

## What Am I Going to Learn?

By the end of this lesson, I want to understand:

- What an event actually is.
- Why Node.js uses an event-driven approach.
- What `EventEmitter` does and how its parts work together.
- How to create events and listen for them.
- How to pass data along with an event.
- How multiple listeners respond to the same event.
- The difference between `on()` and `once()`.
- How to remove listeners.
- How to use events inside my own classes.
- Where event-driven communication fits into backend development.

## 1. First, What Is an Event?

An event is simply **a notification that something has happened**.

I already encounter events in everyday programming, even if I haven't always called them that.

For example:

| Event | What happened? |
|---|---|
| `studentRegistered` | A new student registered |
| `paymentCompleted` | A payment was completed |
| `fileUploaded` | A file was uploaded |
| `serverStarted` | A server started listening |
| `requestReceived` | An HTTP request arrived |

The event name describes what happened.

An event doesn't necessarily perform an action by itself. It gives the application a way to announce something that other parts of the application may care about.

For example, `studentRegistered` is the notification. Sending a welcome email is one possible reaction to that notification.

## 2. The Problem With Calling Every Function Directly

Suppose I write a student registration function like this:

```javascript
function registerStudent(student) {
    saveStudent(student);
    sendWelcomeEmail(student);
    logRegistration(student);
    updateStatistics(student);
}
```

This works, but the registration function now knows about every task that follows registration.

If I later want to add a notification, generate an activity report, or perform another task, I have to modify this function again.

The problem isn't that direct function calls are bad. They're perfectly useful when one function genuinely needs another function to do its job.

The problem appears when I want to announce something that several independent parts of the application may be interested in.

I want to separate the fact that registration happened from the individual reactions to that event.

## 3. The Event-Driven Mental Model

Instead of directly calling every reaction, I can use an event emitter.

```text
Student Registration
        |
        v
   Emit Event
        |
        v
 "studentRegistered"
        |
        +------> Send Welcome Email
        |
        +------> Log Registration
        |
        +------> Update Statistics
```

The registration code announces the event. The listeners decide what to do when they hear it.

This gives me two important roles:

**Event emitter:** The object that emits events and manages listeners.

**Event listener:** A callback function that runs when a particular event is emitted.

In this example, the registration system emits `studentRegistered`, while the email, logging, and statistics functions listen for it.

The event emitter doesn't need to know the internal details of those functions.

## 4. Meet Node.js EventEmitter

Node.js provides an `EventEmitter` class through its built-in `node:events` module.

I don't need to install a package to use it.

```javascript
import { EventEmitter } from "node:events";

const schoolEvents = new EventEmitter();
```

Here is what I have created:

- `EventEmitter` is the class provided by Node.js.
- `schoolEvents` is an instance of that class.
- I can use this instance to register listeners and emit events.

I'm using ES module syntax because my project uses `"type": "module"`.

## 5. The Three Main Operations

For now, I want to understand three methods: `on()`, `emit()`, and `once()`.

### `on()` — Listen for an Event

```javascript
schoolEvents.on("studentRegistered", () => {
    console.log("A student has registered.");
});
```

The first argument is the event name.

The second argument is the callback that Node.js should invoke when that event is emitted.

Registering a listener doesn't run the callback immediately. It tells the emitter what to do when the event occurs.

### `emit()` — Announce an Event

```javascript
schoolEvents.emit("studentRegistered");
```

This emits the event named `studentRegistered`.

Because I previously registered a listener for that event, its callback runs.

The output is:

```text
A student has registered.
```

The important thing to understand is that **the event name connects the emitter to its listeners**.

If I emit `paymentCompleted` instead, the `studentRegistered` listener won't run because it is listening for a different event.

### `once()` — Listen Only Once

Sometimes I want a listener to run only the first time a particular event is emitted.

For example, I might want to react only once when a particular initialization event occurs.

```javascript
schoolEvents.once("schoolInitialized", () => {
    console.log("School system initialized.");
});
```

After this listener handles the event once, it is automatically removed.

If the same event is emitted again, that listener won't run again.

## 6. What Happens During Execution?

Consider this example:

```javascript
import { EventEmitter } from "node:events";

const schoolEvents = new EventEmitter();

schoolEvents.on("studentRegistered", () => {
    console.log("Registration listener executed.");
});

console.log("Before event");

schoolEvents.emit("studentRegistered");

console.log("After event");
```

Output:

```text
Before event
Registration listener executed.
After event
```

Why does the listener's message appear between the other two messages?

For ordinary `EventEmitter` events, listeners are called synchronously by `emit()`.

That means Node.js calls the registered listener before `emit()` returns to the next line.

The execution flow is:

1. Node.js creates the emitter.
2. The application registers the listener.
3. `console.log()` prints `Before event`.
4. `emit()` announces the event.
5. The registered callback runs.
6. The callback returns.
7. Execution continues, printing `After event`.

This is an important distinction: **using events does not automatically make the listener asynchronous**.

If a listener starts an asynchronous operation, that operation has its own execution behavior. The event emitter itself doesn't automatically wait for promises returned by listeners.

## 7. Passing Data With Events

An event becomes more useful when listeners receive information about what happened.

For example, knowing that a student registered is useful, but knowing which student registered is even more useful.

I can pass arguments to `emit()`:

```javascript
schoolEvents.emit("studentRegistered", {
    id: 101,
    name: "Vivek",
    course: "CSE"
});
```

The listener receives those arguments through its callback parameters:

```javascript
schoolEvents.on("studentRegistered", (student) => {
    console.log(`Welcome, ${student.name}!`);
    console.log(`Course: ${student.course}`);
});
```

Output:

```text
Welcome, Vivek!
Course: CSE
```

I can pass multiple arguments as well. The values supplied to `emit()` after the event name become the arguments received by each listener.

This allows events to carry the information listeners need without requiring the emitter to know how each listener uses that information.

## 8. Multiple Listeners for the Same Event

A single event can have multiple listeners.

```javascript
schoolEvents.on("studentRegistered", (student) => {
    console.log(`Welcome email queued for ${student.name}.`);
});

schoolEvents.on("studentRegistered", (student) => {
    console.log(`Registration logged for ${student.name}.`);
});

schoolEvents.on("studentRegistered", (student) => {
    console.log(`Statistics updated for ${student.name}.`);
});

schoolEvents.emit("studentRegistered", { name: "Vivek" });
```

Output:

```text
Welcome email queued for Vivek.
Registration logged for Vivek.
Statistics updated for Vivek.
```

For ordinary event emission, listeners are invoked synchronously in the order in which they were registered.

This means I can register several independent reactions to the same event.

However, I should remember that a slow synchronous listener can delay the execution of later listeners. Event emitters don't automatically move callbacks to separate threads or make them run in parallel.

## 9. Removing Listeners

Listeners don't always need to stay registered forever.

For example, if a temporary component no longer needs to receive notifications, I can remove its listener.

```javascript
function logStudentRegistration(student) {
    console.log(`Student registered: ${student.name}`);
}

schoolEvents.on("studentRegistered", logStudentRegistration);

schoolEvents.emit("studentRegistered", { name: "Vivek" });

schoolEvents.off("studentRegistered", logStudentRegistration);

schoolEvents.emit("studentRegistered", { name: "Rahul" });
```

The listener logs the first registration but not the second, because it was removed between the two emissions.

I need to keep a reference to the original callback to remove that particular listener. Writing a new anonymous function with identical code won't identify the original callback.

Removing listeners is useful when managing subscriptions and preventing unwanted callbacks or unnecessary memory retention.

## 10. EventEmitter Inside My Own Classes

I can also make my own classes emit events.

Imagine I have a `StudentService` responsible for registering students. Instead of making the service directly handle every reaction, it can announce that registration has completed.

```javascript
import { EventEmitter } from "node:events";

class StudentService extends EventEmitter {
    registerStudent(student) {
        console.log(`Saving student: ${student.name}`);

        this.emit("studentRegistered", student);
    }
}

const studentService = new StudentService();

studentService.on("studentRegistered", (student) => {
    console.log(`Welcome, ${student.name}!`);
});

studentService.registerStudent({
    id: 101,
    name: "Vivek",
    course: "CSE"
});
```

Output:

```text
Saving student: Vivek
Welcome, Vivek!
```

The `extends EventEmitter` part allows `StudentService` instances to use the event-emitter methods.

The `this.emit()` call announces the event from inside the class.

The service handles the registration operation, while listeners respond to the completed registration.

In this simplified example, the student is not actually being saved to a database. A real service would need to complete the relevant database operation before announcing that registration was successfully completed.

## 11. An Important Detail: The Special `error` Event

Node.js `EventEmitter` treats the event named `error` specially.

If an emitter emits an `error` event without a registered error listener, Node.js normally throws the supplied error, which can terminate the process if it remains uncaught.

For example:

```javascript
import { EventEmitter } from "node:events";

const schoolEvents = new EventEmitter();

schoolEvents.on("error", (error) => {
    console.error("School event error:", error.message);
});

schoolEvents.emit("error", new Error("Registration failed"));
```

Output:

```text
School event error: Registration failed
```

Registering an `error` listener allows the application to handle that emitted error.

This doesn't mean every error in the application automatically becomes an EventEmitter error event. The code must emit that event explicitly, and other error-handling mechanisms still matter.

## 12. Where Will I Use This in Backend Development?

Event emitters are useful for communication within a Node.js process.

Examples include:

- Notifying other parts of an application when a task completes.
- Reacting to events emitted by Node.js streams.
- Handling lifecycle events from servers and other APIs.
- Implementing internal notifications between cooperating objects.
- Building reusable classes that announce changes without directly calling every consumer.

For a larger application, I might eventually want a separate message broker or queue for durable, cross-process communication. A regular `EventEmitter` is in-memory: it doesn't persist events for later, and listeners in another Node.js process won't receive its events automatically.

## 13. Connecting This to What I Already Know

I can connect EventEmitter to several concepts I've already learned.

**Modules:** I import `EventEmitter` from Node.js's built-in `node:events` module, just as I use other built-in modules.

**Callbacks:** A listener is a callback function that gets invoked when its event is emitted.

**HTTP server:** Node.js provides server lifecycle events, and HTTP-related APIs can use event-based behavior internally. My existing `createServer()` request callback is still a valid way to handle incoming requests.

**Process object:** The `process` object exposes event-based behavior too. For example, `process.on("SIGINT", callback)` registers a callback for a process signal.

These are connected ideas, but they aren't identical. EventEmitter is a specific mechanism for registering and emitting named events.

## 14. Lesson Takeaway

I now understand that an event is a notification that something happened, a listener is a callback that reacts to that notification, and an emitter is responsible for announcing events.

The key methods are:

| Method | Purpose |
|---|---|
| `on(event, listener)` | Register a listener |
| `emit(event, ...args)` | Emit an event and pass arguments |
| `once(event, listener)` | Register a listener that handles the event once |
| `off(event, listener)` | Remove a registered listener |

I also learned that ordinary EventEmitter listeners execute synchronously in registration order, and that event-driven code is not automatically asynchronous.

## What's Next?

After understanding how Node.js communicates through events, I want to learn **Buffers** and **Streams**. These will help me understand how Node.js works with binary data and handles large amounts of data efficiently, including data that arrives in chunks rather than all at once.