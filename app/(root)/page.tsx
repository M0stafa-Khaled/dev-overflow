import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { query = "" } = await searchParams;
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">ALl Questions</h1>
        <Button
          asChild
          className="primary-gradient min-h-[46px] px-4 py-3 text-light-900!"
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        <QuestionCard
          question={{
            _id: "1",
            answers: 5,
            author: { name: "mostafa", image: "", _id: "1" },
            createdAt: new Date("2025-12-5"),
            tags: [
              {
                _id: "1",
                name: "React",
              },
              {
                _id: "2",
                name: "javascript",
              },
            ],
            title: "What is the best way to learn React?",
            upvotes: 5,
            views: 500,
          }}
        />
        <QuestionCard
          question={{
            _id: "1",
            answers: 5,
            author: { name: "mostafa", image: "", _id: "1" },
            createdAt: new Date("2025-12-5"),
            tags: [
              {
                _id: "1",
                name: "React",
              },
              {
                _id: "2",
                name: "javascript",
              },
            ],
            title: "What is the best way to learn React?",
            upvotes: 5,
            views: 500,
          }}
        />
        <QuestionCard
          question={{
            _id: "1",
            answers: 5,
            author: { name: "mostafa", image: "", _id: "1" },
            createdAt: new Date("2025-12-5"),
            tags: [
              {
                _id: "1",
                name: "React",
              },
              {
                _id: "2",
                name: "javascript",
              },
            ],
            title: "What is the best way to learn React?",
            upvotes: 5,
            views: 500,
          }}
        />
      </div>
    </>
  );
};

export default Home;
