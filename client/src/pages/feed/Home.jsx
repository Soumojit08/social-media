import { Button } from "@/components/ui/button";
import Orb from "@/components/shared/Orb";
import { ArrowRight } from "lucide-react";
import { Show, SignInButton } from "@clerk/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen top-0 left-0 w-full flex flex-col items-center justify-center">
      <div
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
          top: "50%",
          left: "50%",
          translate: "-50%",
        }}
      >
        <Orb
          hoverIntensity={0.65}
          rotateOnHover
          hue={271}
          forceHoverState={false}
          backgroundColor="#09090b"
        />
      </div>

      <section className="hero-section flex flex-col items-center space-y-1 font-sans absolute">
        <h1 className="text-5xl capitalize tracking-tight md:text-8xl lg:text-9xl">
          Explore the world
        </h1>
        <h2 className="text-3xl capitalize tracking-tight md:text-6xl lg:text-7xl">
          Beyond your imagination
        </h2>
        <p className="text-sm text-muted-foreground w-4/5 px-6 text-center md:w-2/3 lg:w-2/3 md:text-base lg:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          laboriosam est a, consequuntur, voluptatum facilis doloremque aut
          quibusdam asperiores libero unde corporis minima? Molestias impedit
          eligendi nulla numquam, eveniet consectetur deserunt, sint, vero
          similique provident placeat? Asperiores necessitatibus enim
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="default" size="hero">
                Get Started
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Button variant="default" size="hero" onClick={handleExplore}>
              Explore Now
              <span>
                <ArrowRight />
              </span>
            </Button>
          </Show>
          <Button variant="outline" size="hero">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
