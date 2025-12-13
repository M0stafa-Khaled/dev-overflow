import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/icons/hamburger.svg"}
          alt="Menu"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        className="background-light900_dark200 border-none"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src={"/images/site-logo.svg"}
              width={23}
              height={23}
              alt="DevFlow Logo"
            />
            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Flow</span>
            </p>
          </Link>
        </SheetHeader>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto px-4">
          <SheetClose asChild>
            <section className="flex flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>
        </div>

        <SheetFooter className="gap-3">
          <SheetClose asChild>
            <Button
              asChild
              className="small-medium btn-secondary min-h-10 w-full rounded-lg px-4 shadow-none"
            >
              <Link href={ROUTES.AUTH.SIGN_IN}>
                <span className="primary-text-gradient">Log In</span>
              </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              asChild
              className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-10 w-full rounded-lg border px-4 py-3 shadow-none"
            >
              <Link href={ROUTES.AUTH.SIGN_UP}>Sign Up</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
