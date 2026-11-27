"use client";

import { usePathname } from "next/navigation";
import LocalSearch from "../search/LocalSearch";

const JobsFilter = () => {
  const pathname = usePathname();

  return (
    <div className="relative mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center">
      <LocalSearch
        route={pathname}
        iconPosition="left"
        imgSrc="/icons/job-search.svg"
        placeholder="Job Title, Company, or Keywords"
        otherClasses="flex-1 max-sm:w-full"
      />
    </div>
  );
};

export default JobsFilter;
