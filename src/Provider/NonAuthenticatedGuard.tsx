"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated, selectAccessToken } from "@/redux/features/auth/authSlice";

interface NonAuthenticatedGuardProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const NonAuthenticatedGuard = ({ children, redirectTo = "/dashboard" }: NonAuthenticatedGuardProps) => {
    const router = useRouter();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const accessToken = useAppSelector(selectAccessToken);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Use a flag to track if component is mounted
        let isMounted = true;

        const checkAuth = () => {
            if (isAuthenticated && accessToken) {
                // User IS authenticated → redirect to home/dashboard
                router.push(redirectTo);
            } else if (isMounted) {
                // Only update state if component is still mounted
                setIsChecking(false);
            }
        };

        // Use setTimeout to make it asynchronous
        const timer = setTimeout(checkAuth, 0);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [isAuthenticated, accessToken, router, redirectTo]);

    // Show loading while checking
    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Render children only if user is NOT authenticated
    if (!isAuthenticated || !accessToken) {
        return <>{children}</>;
    }

    return null;
};

export default NonAuthenticatedGuard;
