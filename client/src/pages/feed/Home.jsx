import { Button } from "@/components/ui/button";
import Orb from "@/components/shared/Orb";
import { ArrowRight } from "lucide-react";
import { Show, SignInButton } from "@clerk/react";

const Home = () => {
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
        <h1 className="text-8xl capitalize tracking-tight">
          Explore the world
        </h1>
        <h2 className="text-6xl capitalize tracking-tight">
          Beyond your imagination
        </h2>
        <p className="text-sm text-muted-foreground w-1/2 px-6">
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
            <Button variant="default" size="hero">
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
