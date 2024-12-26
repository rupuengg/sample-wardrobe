import React from 'react';
import { App } from 'entrypoints';
import 'assets/style/index.scss';
import reportWebVitals from 'reportWebVitals';
import { createRoot } from 'react-dom/client';

const currentScript = document.currentScript
if (currentScript != null) {
  let appShellId: string | null | undefined = document.currentScript?.getAttribute("app-name")
  if (appShellId == null) {
    appShellId = 'root'
  }
  const appShellIdNode = document.getElementById(appShellId)
  const root = appShellIdNode ? createRoot(appShellIdNode) : undefined;
  root?.render(<React.StrictMode><App /></React.StrictMode>)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();