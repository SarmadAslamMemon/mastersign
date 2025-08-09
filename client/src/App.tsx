import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import { TemplateEditorRoute } from "@/components/TemplateEditor";
import { TldrawWrapperTest } from "@/components/TemplateEditor/Canvas"; // Added for testing
import ProductDetailPage from "@/pages/product-detail-page";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import EditorPage from "@/pages/editor-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/editor" component={TemplateEditorRoute} />
      <Route path="/editor/:templateId" component={EditorPage} />
      <Route path="/test-canvas" component={TldrawWrapperTest} />
      <Route path="/product/:id" component={ProductDetailPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
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
