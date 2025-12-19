import { Model, model, models, Schema, Document } from "mongoose";

export interface ITag {
  name: string;
  questions: number;
}

export interface ITagDoc extends ITag, Document {}
const tagSchema = new Schema<ITagDoc>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tag = (models?.Tag as Model<ITagDoc>) || model<ITagDoc>("Tag", tagSchema);

export default Tag;
