import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import "@fontsource/inter";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = extendTheme({
    components: {
        JoyChip: {
            defaultProps: {
                size: "sm",
            },
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                },
            },
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <CssVarsProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </CssVarsProvider>
        </BrowserRouter>
    </StrictMode>
);
