import { ThemeProvider } from "@/components/home/theme-provider"
import './App.css'
import Home from "./pages/home"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div vaul-drawer-wrapper="" className="bg-background">
        <Home/>
      </div>
    </ThemeProvider>

  )
}

export default App
