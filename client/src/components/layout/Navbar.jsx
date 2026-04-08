import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../shared/mode-toggle";

const Navbar = () => {
  return (
    <header>
      <nav className="fixed top-0 inset-x-0 flex items-center justify-between px-4">
        <h1>Societ</h1>

        <div>
          <ModeToggle />
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button>sign up</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline">sign in</Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
