export default function DashboardLayout({ children }: LayoutProps<"/">) {
    return (
      <div className="flex h-screen bg-white">

        <section id="sidebar" className="w-[250px] bg-white p-4">
            This is the sidebar
        </section>

        <div className="flex-1 flex flex-col overflow-y-auto">

            <header className="py-2 px-4">
                This is the navbar
            </header>

            <main className="flex-1 p-4 rounded-l-4xl bg-[#FFFAF0]">
                {children}
                
            </main>

            <footer className="py-2 px-4">
                2026 Studio Studios
            </footer>

        </div>

      </div>
    );
  }