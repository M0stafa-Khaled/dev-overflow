import ROUTES from "@/constants/routes";
import { User } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
  className?: string;
}
const UserAvatar = ({ user, className = "h-9 w-9" }: UserAvatarProps) => {
  const initials = user.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(user.id!)}>
      <Avatar className={className}>
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name!}
            width={36}
            height={36}
            className="object-contain"
          />
        ) : (
          <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
