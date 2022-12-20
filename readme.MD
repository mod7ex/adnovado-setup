> the idea behind the folder `lib` is implementing the FACADE pattern

> the idea behind the folder `services` is integration with APIs (login ...)

> the idea behind the folder `features` https://youtu.be/UUga4-z7b6s?t=721

```
features
|___________ todos
            |_______components
            |_______services
            |_______assets
            |_______utils
            |_______hooks
            |_______lib
            |_______ ...
            |_______ index.ts (to export what's needed)

it's just like the src folder (but many folders are optional)
```

---

> hooks https://github.com/modex98/react-hads-dirty/tree/master/theory/src/hooks

> https://react-typescript-cheatsheet.netlify.app

---

---

# Debugging Events

-   You can see event handlers in console using `getEventListeners($0)`
-   or `monitorEvents($0, <event name> | <event name>[])` (verifying) once you finish use `unmonitorEvents` or refresh the page
-   but before inspect the target element so you can have `$0` as your target
-   Also it's possible to see event handlers in the `Elements > event Listners` tab

---

> https://www.eternaldev.com/blog/testing-a-react-application-with-vitest

> https://www.linkedin.com/pulse/setting-up-rtl-vite-react-project-william-ku

> https://youtube.com/playlist?list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd ------- 6
