import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import PeoplePage from "./pages/PeoplePage/PeoplePage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage.tsx";
import GeoSpatialViewerPage from "./pages/GeoSpatialViewerPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditPersonPage } from "./pages/EditPersonPage/EditPersonPage.tsx";
import { AddPersonPage } from "./pages/AddPersonPage/AddPersonPage.tsx";
import { FriendsPage } from "./pages/FriendsPage/FriendsPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="people" element={<PeoplePage />} />
              <Route path="people/:id" element={<EditPersonPage />} />
              <Route path="add-person" element={<AddPersonPage />} />
              <Route path="people/:id/friends" element={<FriendsPage />} />

              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="geo" element={<GeoSpatialViewerPage />} />
              <Route path="tasks" element={<TasksPage />} />
            </Route>
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
