import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/router';
var domNode = document.getElementById('root');
var root = createRoot(domNode);
root.render(_jsx(RouterProvider, { router: router }));
