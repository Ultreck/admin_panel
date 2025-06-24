import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMockAuth } from "@/hooks/useMockAuth";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./pages/Login";

function Router() {
  const { isAuthenticated, isLoading } = useMockAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Login} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
