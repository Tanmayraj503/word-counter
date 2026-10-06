import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
function Router() {
    return (<Switch>
      <Route path="/" component={Home}/>
      <Route path="/404" component={NotFound}/>
      <Route component={NotFound}/>
    </Switch>);
}
function App() {
    return (<ErrorBoundary>
      <ThemeProvider defaultTheme={typeof window !== "undefined" && (window.localStorage.getItem("theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))}>
        <TooltipProvider>
          <Toaster position="bottom-right"/>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>);
}
export default App;
