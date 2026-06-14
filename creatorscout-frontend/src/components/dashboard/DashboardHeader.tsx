"use client";

import { Zap, TrendingUp, LogOut, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            upstageX · Creator Marketplace
          </div>

          {isAuthenticated && (
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground h-8"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Creator</span>
            <span className="gradient-text">Scout</span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            Discover, evaluate, and shortlist the perfect creators for your next
            marketing campaign — powered by real-time data.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 hidden md:flex">
        {isAuthenticated && user && (
          <div className="flex items-center gap-3 bg-secondary/50 border border-border/50 rounded-full px-4 py-1.5">
            <Badge variant="secondary" className="h-5 px-2 text-[10px] uppercase tracking-wider font-bold bg-primary/20 text-primary hover:bg-primary/20 border-primary/30">
              Brand Account
            </Badge>
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{user.email}</span>
            <div className="h-4 w-px bg-border mx-1" />
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">Live data</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 border-primary/30 bg-primary/10 px-3 py-1.5 text-primary"
          >
            <Zap className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">30–50 vetted creators</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}