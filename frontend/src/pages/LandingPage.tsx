import LandingPageNavbar from "../features/landingpage/LandingPageNavbar";
import Hero from "../features/landingpage/Hero";
import type { IThemeProp } from "./UserDashboard";
import Features from "../features/landingpage/Features";
import Footer from "../features/landingpage/Footer";

function LandingPage({ handleToggleTheme, theme }: IThemeProp) {
    return (
        <main className="relative h-screen w-full bg-(--background) overflow-y-scroll">
            <LandingPageNavbar
                handleToggleTheme={handleToggleTheme}
                theme={theme}
            />
            <Hero />
            <Features />
            <Footer />
        </main>
    );
}

export default LandingPage;
