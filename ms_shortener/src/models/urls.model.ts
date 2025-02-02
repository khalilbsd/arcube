

import mongoose, { Schema } from "mongoose";
import { IUrl } from "types/IUrl.interface.js";
import shortid from "shortid"
const urlSchema = new Schema(
    {
        _id: {
            type: String,
            default: shortid.generate
        },
        originalUrl: {
            type: String,
            required: true
        },
        custom: {
            type: Boolean,
            required: true ,
            default: false
        }


    },
    { timestamps: true }

);

const Url = mongoose.model<IUrl>('urls', urlSchema);

export default Url;


