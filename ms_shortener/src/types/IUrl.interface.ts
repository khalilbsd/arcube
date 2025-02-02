
import shortid from "shortid";

export interface IUrl {
    _id?: shortid.generate;
    originalUrl: string;
    custom: boolean;
}