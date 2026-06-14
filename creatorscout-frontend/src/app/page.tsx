"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthDialog from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  Sparkles,
  Users,
  CheckCircle2,
  BarChart3,
  Globe,
  Shield,
  Play,
} from "lucide-react";

const FEATURES = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    color: "text-primary bg-primary/15",
    title: "Real-time Analytics",
    desc: "Live engagement rates, follower growth, and audience demographics at your fingertips.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    color: "text-emerald-400 bg-emerald-500/15",
    title: "Vetted Creators",
    desc: "Every creator goes through rigorous vetting. Only authentic, high-quality partners make the cut.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    color: "text-amber-400 bg-amber-500/15",
    title: "Instant Shortlisting",
    desc: "Bookmark your top picks instantly. Build your dream campaign roster in seconds.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    color: "text-cyan-400 bg-cyan-500/15",
    title: "Global Reach",
    desc: "Discover creators from every corner of the world, spanning every niche and platform.",
  },
];

const SOCIAL_PROOF = [
  { value: "50+", label: "Vetted Creators", icon: <Star className="h-5 w-5" />, color: "text-primary" },
  { value: "12", label: "Content Niches", icon: <Sparkles className="h-5 w-5" />, color: "text-violet-400" },
  { value: "2", label: "Top Platforms", icon: <Play className="h-5 w-5" />, color: "text-pink-400" },
  { value: "10M+", label: "Combined Reach", icon: <Globe className="h-5 w-5" />, color: "text-cyan-400" },
];

const CREATOR_MOCKUPS = [
  { name: "Tech With Alex", niche: "Technology", platform: "YouTube", followers: "890K", engagement: "8.2%", score: 172 },
  { name: "FitLife Priya", niche: "Fitness", platform: "Instagram", followers: "1.2M", engagement: "9.1%", score: 185 },
  { name: "CodeMaster Dev", niche: "Programming", platform: "YouTube", followers: "540K", engagement: "7.4%", score: 158 },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/discover");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "3s" }} />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? "border-b border-border/40 bg-background/80 backdrop-blur-2xl shadow-lg shadow-black/10"
            : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              Creator<span className="text-primary">Scout</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AuthDialog
              defaultTab="login"
              trigger={
                <Button variant="ghost" className="font-semibold text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              }
            />
            <AuthDialog
              defaultTab="register"
              trigger={
                <Button size="sm" className="rounded-full px-5 font-bold shadow-md shadow-primary/25">
                  Get Started
                </Button>
              }
            />
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-28 pb-20 px-6">
        <div className="container mx-auto text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            upstageX · Creator Marketplace
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-[88px] font-extrabold tracking-tighter leading-none mb-8 animate-fade-in-up" style={{ animationDelay: "80ms", opacity: 0 }}>
            <span className="text-foreground block">Find the perfect</span>
            <span className="gradient-text block mt-2">creators</span>
            <span className="text-foreground block mt-2">for your brand.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "180ms", opacity: 0 }}>
            Discover, evaluate, and shortlist top-performing YouTube and Instagram creators — powered by real-time analytics and our proprietary creator scoring system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "280ms", opacity: 0 }}>
            <AuthDialog
              defaultTab="register"
              trigger={
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg font-bold btn-glow group rounded-full shadow-xl shadow-primary/30"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start for Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              }
            />
            <AuthDialog
              defaultTab="login"
              trigger={
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-lg font-bold rounded-full border-border/60 hover:bg-accent/50 backdrop-blur-sm"
                >
                  Sign In
                </Button>
              }
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "380ms", opacity: 0 }}>
            {[
              "No credit card required",
              "Free to get started",
              "Instant access",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SOCIAL_PROOF.map((item, idx) => (
              <div
                key={item.label}
                className="glass-card rounded-2xl border border-border/40 p-6 text-center animate-fade-in-scale"
                style={{ animationDelay: `${idx * 80}ms`, opacity: 0 }}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-border/20 ${item.color} mb-4`}>
                  {item.icon}
                </div>
                <p className={`text-3xl font-extrabold ${item.color} mb-1`}>{item.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Platform Preview</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              Discover elite creators, instantly
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Browse through our curated roster of high-performing creators with detailed profiles and real metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {CREATOR_MOCKUPS.map((creator, idx) => (
              <div
                key={creator.name}
                className="glass-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in-up hover:-translate-y-1 transition-transform duration-300"
                style={{ animationDelay: `${idx * 100}ms`, opacity: 0 }}
              >

                <div className="h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-pink-500" />
                <div className="p-5 space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/40 to-violet-500/40 flex items-center justify-center text-white font-bold text-sm ring-2 ring-primary/30">
                      {creator.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{creator.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {creator.platform === "YouTube" ? "📺" : "📸"} {creator.platform}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                        <Star className="h-3 w-3 fill-primary" />
                        {creator.score}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-muted/30 p-2 text-center">
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Followers</p>
                      <p className="text-sm font-extrabold text-foreground">{creator.followers}</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-2 text-center">
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Engagement</p>
                      <p className="text-sm font-extrabold text-emerald-400">{creator.engagement}</p>
                    </div>
                  </div>

                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/15 text-primary border border-primary/20">
                    {creator.niche}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <AuthDialog
              defaultTab="register"
              trigger={
                <Button variant="outline" size="lg" className="rounded-full border-border/60 font-bold gap-2">
                  <Users className="h-4 w-4" />
                  View All 50+ Creators
                  <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 border-t border-border/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why CreatorScout</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              Everything you need to build{" "}
              <span className="gradient-text">winning campaigns</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl border border-border/40 p-6 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms`, opacity: 0 }}
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-violet-500/5 to-pink-500/10 p-16 text-center">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="text-5xl font-extrabold tracking-tight text-foreground mb-6">
                Ready to find your{" "}
                <span className="gradient-text">perfect creator?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                Join upstageX brands who are already discovering and partnering with the world&apos;s top creators.
              </p>
              <AuthDialog
                defaultTab="register"
                trigger={
                  <Button
                    size="lg"
                    className="h-14 px-12 text-lg font-bold btn-glow rounded-full shadow-2xl shadow-primary/30 group"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started — It&apos;s Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/30 px-6 py-8">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span>Creator<span className="text-primary">Scout</span></span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 upstageX · All rights reserved · Powered by real-time data
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span>Live data · Always current</span>
          </div>
        </div>
      </footer>
    </div>
  );
}