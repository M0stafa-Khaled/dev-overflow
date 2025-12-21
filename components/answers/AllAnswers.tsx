import { EMPTY_ANSWERS } from "@/constants/states";
import DataRenderer from "../DataRenderer";
import AnswerCard from "./AnswerCard";

interface Props extends ActionResponse<Answer[]> {
  totalAnswers?: number;
}

const AllAnswers = ({ data, success, error, totalAnswers }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <p>Filter</p>
      </div>
      <DataRenderer
        success={success}
        error={error}
        empty={EMPTY_ANSWERS}
        data={data}
        render={(answers) =>
          answers.map((answer) => (
            <AnswerCard key={answer._id} answer={answer} />
          ))
        }
      />
    </div>
  );
};

export default AllAnswers;
