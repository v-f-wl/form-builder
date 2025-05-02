import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import IProfile from "../icons/profile-icon";

const AuthButtons = () => {
  const t = useTranslations();

  return (
    <>
      <SignedOut>
        <div className="d-flex gap-2">
          <SignInButton>
            <button className="btn btn-primary">{t('header.signIn')}</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn btn-outline-primary">{t('header.signUp')}</button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<IProfile />}
              href="/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </>
  );
};

export default AuthButtons