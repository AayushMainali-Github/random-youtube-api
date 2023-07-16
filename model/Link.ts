import { Schema, model } from "mongoose";
import { LinkData } from "../utils/interfaces/Link";

const linkSchema = new Schema<LinkData>({
  link: { type: String, required: true },
  id: { type: String, required: true },
});

const Link = model<LinkData>("Link", linkSchema);

export default Link;
