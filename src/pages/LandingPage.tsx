import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/TypewriterText";
import {
  Leaf,
  TrendingUp,
  Zap,
  Database,
  CloudRain,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-700" />
            <h1 className="text-2xl font-bold text-green-700">
              <TypewriterText text="AgroScope" delay={150} />
            </h1>
          </div>
          <Button
            variant="outline"
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300"
            onClick={() => navigate(`/login`)}
          >
            Login / Signup
          </Button>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Precision Farming
                <br />
                <span className="text-green-700 animate-glow-pulse">
                  Powered by AI
                </span>
              </h2>
              <p className="text-xl text-white/90 max-w-lg">
                Transform your agricultural operations with intelligent crop
                monitoring, predictive analytics, and data-driven insights.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-green-700 text-white font-semibold px-8 py-6 rounded-full text-lg shadow-lg hover:bg-green-800 hover:shadow-green-700/40 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-700 text-green-700 bg-white/10 hover:bg-green-700 hover:text-white px-8 py-6 rounded-full text-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-700/70 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-green-700 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-bold text-green-700">
              Intelligent Agriculture Solutions
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of AI to optimize yield, reduce waste, and
              promote sustainable farming practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                description:
                  "Forecast crop yields and market trends with advanced machine learning algorithms.",
              },
              {
                icon: CloudRain,
                title: "Weather Intelligence",
                description:
                  "Real-time weather monitoring and predictive insights for optimal farming decisions.",
              },
              {
                icon: Database,
                title: "Data Management",
                description:
                  "Centralize and analyze your farm data for actionable insights and better planning.",
              },
              {
                icon: Activity,
                title: "Crop Health Monitoring",
                description:
                  "AI-powered plant health detection using drone imagery and sensor data.",
              },
              {
                icon: Zap,
                title: "Automated Alerts",
                description:
                  "Instant notifications for pest detection, irrigation needs, and critical events.",
              },
              {
                icon: Leaf,
                title: "Sustainability Tracking",
                description:
                  "Monitor and improve your environmental impact with detailed sustainability metrics.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-card rounded-2xl border border-border hover:border-green-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-700/10 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-green-700 mb-3">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h3>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers already using AgroScope to increase yields
            and reduce costs.
          </p>
          {/* <Button
            size="lg"
            className="bg-white text-green-700 hover:bg-green-100 font-semibold px-10 py-7 rounded-full text-lg shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free Trial
          </Button> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-700" />
              <span className="font-semibold text-green-700">AgroScope</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 AgroScope. Cultivating the future of agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
