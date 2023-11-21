# Data bureau web

## Getting started

### Running development server

To run V2 development server, issue the following command:

```bash
$ make start
```

You'll be able to access frontend app under `http://localhost/` URL

### Running development tools

To run styling code checks, issue:
```bash
$ cd app/SPA && npm run check
```

Make sure you have Node v19.3.0 installed. You can set current node version using command `nvm use`. 
It'll automatically take current version from .nvmrc file and apply it (Or run them inside containers created by `make start`)

## Architecture and guidelines
### Making and styling components
All of the UI is built using a set of our own components build with React. The preferred way to style them is with stylus-lang classes. 
So each component consists of 2 files - `ComponentName.styl` and `index.tsx`.

`ComponentName.styl` could be something like (notice that indents are 4 spaces): 
```stylus
@import "@Assets/global_style"

:local(.ComponentName)
    background-color blue
```
`index.tsx`:
```tsx
import * as style from './ComponentName.styl'

interface ComponentNameProps {
  name: string
}

export const ComponentName = ({name}: ComponentNameProps) => {
    return <div className={style.ComponentName}> Hello {name}</div> 
}
```

### State management
For "common data" that is used across the app (for example the list of users permissions) we use a Redux container. Async logic is handled by Redux Api Middleware (for API communication) and Redux Thunk (for more complex cases). 
The goal with that is to load common data just once, when it's needed for the first time.

Local state in the components is stored and processed both on the component level (both with Hooks and Class Based Components) as well as with Redux. Whichever approach results with cleaner code is the preferred one. 

For example imagine a component which display a list of posts from last week coming from one of the Facebook pages that a user has access to. In that case, most likely we would keep the list of Facebook pages that a user has access to in Redux (as that is likely to be used by some other components) and a list of posts inside the component state.

### API
All the data presented to user should be coming exclusively from Data bureau API v2. User authentication is handled by JWT authentication. If we serve data from non shareablee data sources, we still proxy those through Data bureau API v2. 

### Presenting data
For tabular data we tend to use AGGrid, wrapped inside one of our components (`src/components/Grid/`) that add some custom functionalities as well as Shareablee look and feel.

### Quality assurance
All frontend code that is shipped to production must:
1. be compliant with our ESlint rules (defined in `package.json`)
2. have .styl files indented with 4 spaces
3. be (at least partially) covered with frontend tests.
4. follow a defined import rule
   ```tsx
   import ClassNames from 'classnames' // import from installed modules first

   import { Placeholder } from '@Home/components/Placeholder' // absolute imports except images

   import { ProgressBar } from '../ProgressBar' // relative imports

   import { ReactComponent as DashWelcome } from '@Images/dashboard_welcome.svg' // image imports
   import style from './Step.styl' // style imports
   ```

### Unit testing
Ongoing.....

#### Rules
1. All the tests should be stored in `src` directory, next to the file they test, with `.spec.ts|tsx` extension (tests for `src/components/TestComponent.tsx` should be located in `src/components/TestComponent.spec.tsx`).
2. Every component test should contain one snapshot test. We use snapshots to detect for which components the output HTML has changed (and how). Components for snapshots should be rendered in their "default" state, with all necessary data fetched (if applicable).
3. We use RTL selectors for asserting proper component functioning. Snapshot tests are highly discouraged for functional testing.
4. Try to use `jest.mock` as little as possible. Our goal is to test components in environment resembling the app in the browser as closely as possible.

#### Test helpers
The regular way of testing components with RTL is to import `render` from the `@testing-library/react`. Some of our use cases though are complex enough that we wrote few helper functions wrapping the `render` function to make our job easier.
All of them are located in `SPA/tests/rtlUtils.tsx`
Here's how to make the decision what function to use when testing a component:
1. You are testing a Widget component - In this case you should use the `renderWidgetInWrappers` helper. It takes the name of the widget as an argument, and renders it in the environment similar to the one we use in the application, wrapped in all required Providers.
2. You are testing a component connected to Redux store or with routing inside - Use `renderWithProviders` function. It will wrap your component in all Providers it needs (except for contexts providers, you need to supply that on your own if it's necessary).
3. You are testing a simple component not connected to Redux nor containing routing - Go with the unwrapped `render` function from `@testing-library/react`

Both render helpers are wrapping your component in the Redux store. It can preload a user object with permissions (enterprise or noPermissions) into the store if specified.
You can also inject any object into the store by passing object into the render function, but in most cases it should not be necessary because all the data should be fetched by the component itself from the mocked api (besides the user data which has to be preloaded)
