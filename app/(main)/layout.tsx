import Navbar from "@/components/main/navbar";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
      <div className="min-h-screen flex flex-col items-center w-full">
        
        <Navbar />

        <main className="flex-1 max-w-[1000px] w-full px-4 py-8 sm:py-16 rounded-[20px]">
            {children}
        </main>

        <footer className="max-w-[1000px] w-full py-2 px-4">
            <span className="font-medium text-sm text-gray-400">© 2026 Studio Studios - All Rights Reserved.</span>
        </footer>
      </div>
    );
  }