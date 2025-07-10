import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-20 md:ml-24">
        <TopBar />
        <main className="flex-1 px-0 md:px-0 min-h-screen pt-16"> {/* pt-16 for TopBar height */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 