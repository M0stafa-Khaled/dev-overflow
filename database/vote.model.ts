import { model, models, Schema, Types, Document } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends IVote, Document {}
const voteSchema = new Schema<IVoteDoc>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  id: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ["question", "answer"], required: true },
  voteType: { type: String, enum: ["upvote", "downvote"], required: true },
});

const Vote = models?.Vote || model<IVoteDoc>("Vote", voteSchema);

export default Vote;
