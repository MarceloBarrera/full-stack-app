import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route path="people" element={<People />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="people/:id" element={<EditPersonPage />} />
          <Route path="people/:id/friends" element={<FriendsPage />} />
          <Route path="add-person" element={<AddPersonPage />} /> */}
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
