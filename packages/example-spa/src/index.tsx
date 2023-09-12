import { Component } from 'example-component';
import { createRoot } from 'react-dom/client';

createRoot(document.body.appendChild(document.createElement('div'))).render(
  <div>
    <Component />
  </div>,
);
