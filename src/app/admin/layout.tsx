'use client'
import { isAuthenticated } from "@/utils/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {        
        if (!isAuthenticated()) {
            // Redirect to login page if not authenticated
            router.push('/admin/login');
        }
    }, [pathname]);
    return(
        <div>
            {children}
        </div>
    )
}

export default MainLayout