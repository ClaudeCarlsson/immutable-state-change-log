"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
require("../styles/globals.css");
const react_1 = require("react");
function App({ Component, pageProps }) {
    const [theme, setTheme] = (0, react_1.useState)('light');
    (0, react_1.useEffect)(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    return (<div className={theme}>
      <header className="p-4">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded">
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <Component {...pageProps}/>
    </div>);
}
