import Header from "@/features/dashboard/_components/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20 px-20 md:px-20 lg:px-40 xl:px-60">{children}</div>
    </div>
  );
};

export default DashboardLayout;
