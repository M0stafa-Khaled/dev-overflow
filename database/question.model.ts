import { Model, model, models, Schema, Types } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvoutes: number;
  downvotes: number;
  answers: number;
  author: Types.ObjectId;
}

export interface IQuestionDoc extends IQuestion, Document {}
const questionSchema = new Schema<IQuestionDoc>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, required: true },
    upvoutes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Question =
  (models?.Question as Model<IQuestionDoc>) ||
  model<IQuestionDoc>("Question", questionSchema);

export default Question;
