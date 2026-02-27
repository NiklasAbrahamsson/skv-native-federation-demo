import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Details } from './pages/Details';
import type { UserData } from './bootstrap';

export interface AppProps {
  userData: UserData | null;
  basePath: string;
}

/**
 * Root React component for the micro frontend.
 *
 * Uses React Router with a `basename` that matches the path the Angular
 * shell mounts this remote under. This lets React Router handle internal
 * navigation (e.g. /sub-app-react/details/1) while the shell's Angular
 * Router delegates the entire /sub-app-react/* subtree here.
 */
export function App({ userData, basePath }: AppProps) {
  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<Dashboard userData={userData} />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
