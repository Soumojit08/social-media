import { Show, SignInButton, UserButton } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../shared/mode-toggle";

const Navbar = () => {
  return (
    <header>
      <nav className="fixed top-0 inset-x-0.5 flex items-center justify-between py-3 px-6 border-b border-border">
        <h1 className="Logo tracking-wider font-sans text-xl">Societ</h1>

        <div className="flex items-center justify-evenly gap-3">
          <ModeToggle />
          <div className="flex items-center justify-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="default" size="xl">
                  Sign in
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;