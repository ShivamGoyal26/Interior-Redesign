import Dashboard from "@/features/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Room Redesigner",
  description:
    "View and manage your room redesign projects, saved designs, and personalized recommendations",
  openGraph: {
    title: "Dashboard | AI Room Redesigner",
    description: "Manage your room redesign projects",
    type: "website",
  },
  robots: {
    index: false, // Often dashboard pages should be private
    follow: false,
  },
};

const DashboardPageRoute = () => {
  return <Dashboard />;
};

export default DashboardPageRoute;
