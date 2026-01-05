import Link from "next/link";
import ROUTES from "@/constants/routes";
import UserAvatar from "../UserAvatar";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="shadow-light100_darknone w-full xs:w-[230px]">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <UserAvatar
          id={user._id}
          name={user.name}
          imageUrl={user.image}
          className="size-[100px] rounded-full object-cover"
          fallbackClassName="text-3xl tracking-widest"
        />

        <Link href={ROUTES.PROFILE(user._id)}>
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{user.username}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default UserCard;
