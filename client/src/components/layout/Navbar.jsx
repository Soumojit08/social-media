import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const Navbar = () => {
  return (
    <header>
      <nav className="fixed top-0 inset-x-0 flex items-center justify-between px-4">
        <h1>Societ</h1>

        <div>
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button>sign up</button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button>sign in</button>
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
