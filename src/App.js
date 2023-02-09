import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import { ProvideAuth, AuthGuard } from "./components/Auth.js";
import { Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import LoginPage from "./pages/LoginPage";
import AppHome from "./pages/AppHome";
import SettingsPage from "./pages/SettingsPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutPlanwisePage from "./pages/AboutPlanwisePage";
import LandingPage from "./pages/LandingPage";

function App() {
    return (
        <ProvideAuth>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthGuard home>
                            <AppShell>
                                <AppHome />
                            </AppShell>
                        </AuthGuard>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <AuthGuard>
                            <AppShell title="Settings">
                                <SettingsPage />
                            </AppShell>
                        </AuthGuard>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AppShell noNav>
                            <LoginPage />
                        </AppShell>
                    }
                />
                <Route
                    path="/contactus"
                    element={
                        <AppShell title="Our Contact Information">
                            <ContactUsPage />
                        </AppShell>
                    }
                />
                <Route
                    path="/aboutplanwise"
                    element={
                        <AuthGuard>
                            <AppShell title="About Planwise">
                                <AboutPlanwisePage />
                            </AppShell>
                        </AuthGuard>
                    }
                />
            </Routes>
        </ProvideAuth>
    );
}

export default App;
