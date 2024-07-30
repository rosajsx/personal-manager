import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Toaster } from "@/components/ui/toaster";

export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-1 h-full">
        <Menu />
        <main className="flex flex-1">{children}</main>
        <Toaster />
      </div>
    </>
  );
}
