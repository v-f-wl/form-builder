'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, UserProfile } from "@clerk/nextjs";
import Logo from "./UI/logo";
import SearchInput from "./UI/search-input";
import ILogo from "./icons/logo-icon";

const Haeader = () => {
  return ( 
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col">
          <Logo/>
        </div>
        <div className="col d-flex">
          <SearchInput/>
        </div>
        <div className="col d-flex gap-3 justify-content-end">
          <SignedOut>
            <SignInButton/>
            <SignUpButton />
          </SignedOut>
          <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Create form"
                labelIcon={<ILogo />}
                href="/create-form"
              />
            </UserButton.MenuItems>
          </UserButton>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}
 
export default Haeader;