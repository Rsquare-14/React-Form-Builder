import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PreviewBar } from "./PreviewBar"

const formBuilder = ReactDOM.createRoot(document.getElementById('form-builder'));
const previewPane = ReactDOM.createRoot(document.getElementById("preview-pane"));

formBuilder.render(
    <App />
);

previewPane.render(
  <PreviewBar />
)
