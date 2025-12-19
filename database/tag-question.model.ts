import { Model, model, models, Schema, Types, Document } from "mongoose";

export interface ITagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

export interface ITagQuestionDoc extends ITagQuestion, Document {}
const tagQuestionSchema = new Schema<ITagQuestionDoc>(
  {
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true }
);

const TagQuestion =
  (models?.TagQuestion as Model<ITagQuestionDoc>) ||
  model<ITagQuestionDoc>("TagQuestion", tagQuestionSchema);

export default TagQuestion;
