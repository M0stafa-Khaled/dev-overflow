import Link from "next/link";
import UserAvatar from "../UserAvatar";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import { Preview } from "../editor/Preview";

const AnswerCard = ({
  answer: { _id, author, content, createdAt },
}: {
  answer: Answer;
}) => {
  return (
    <div className="light-border border-b py-10">
      <span className="hash-span" id={_id.toString()} />

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            user={author}
            className="size-5 rounded-full object-cover max-sm:mt-2"
          />
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col sm:flex-row sm:items-center"
          >
            <p className="body-semibold text-dark300_light700">
              {author.name ?? "Anonymous"}
            </p>
            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden"> * </span>
              answerd {getTimeStamp(createdAt)}
            </p>
          </Link>
        </div>
        <div className="flex justify-end">Votes</div>
      </div>
      <Preview content={content} />
    </div>
  );
};

export default AnswerCard;
