import { SignInButton } from "@clerk/react";

const App = () => {
  return (
    <div>
      <SignInButton mode="modal">
        <button>sign in</button>
      </SignInButton>
    </div>
  );
};

export default App;
