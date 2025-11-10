export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border/40 mt-auto">
      <div className="container max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">TB</span>
            </div>
            <span className="text-sm font-medium">TickBuzz</span>
          </div>

          <div className="text-sm text-muted-foreground">© 2024 TickBuzz. All rights reserved.</div>

          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
