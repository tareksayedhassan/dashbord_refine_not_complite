import {
  Authenticated,
  GitHubBanner,
  Refine,
  WelcomePage,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Home, ForgotPassword, Login, Register } from "./pages";
import { authProvider, dataProvider, liveProvider } from "./Providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "cud2LJ-HwJmYR-jJblBs",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* المسار المحمي - يستخدم Authenticated مع Layout وعرض المكونات الفرعية */}
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="/home" element={<Home />} />
                  {/* يمكنك إضافة صفحات أخرى مثل /dashboard أو /players */}
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
