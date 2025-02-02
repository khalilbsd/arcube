import { messages } from "i18n/messages.eng.js";
import Url from "models/urls.model.js";
import { IServiceResponse } from "types/IService.interface.js";
import { IUrl } from "types/IUrl.interface.js";

class UrlService {
    private urlRegex = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/[^\s]*)?)$/;
    private customPathRegex = /^[a-zA-Z0-9-_]+$/; // Custom path should only contain alphanumeric characters, hyphens, and underscores no https:// or  http:// or suffix (.com,.tn etc....)
    public async getOriginalUrl(id: string): Promise<IServiceResponse> {
        try {
            const shortenedUrl = await Url.findById(id);
            if (!shortenedUrl) {
                return { success: false, message: messages.invalid_shortened_url, code: 404 };
            }
            return { success: true, object: shortenedUrl.originalUrl, code: 200 };
        } catch (error) {
            console.error(error);
            return { success: false, message: messages.something_went_wrong, code: 500 };
        }
    }

    public async shortenUrl(url: string): Promise<IServiceResponse> {
        try {
            if (!this.urlRegex.test(url)) {
                return { success: false, message: messages.invalid_url_format, code: 400 };
            }

            const existingUrl = await this.checkExistingUrl(url);
            if (existingUrl) {
                return { success: true, message: messages.url_shortened_successfully, object: existingUrl._id, code: 201 };
            }

            const newUrl = new Url({ originalUrl: url });
            await newUrl.save();
            return { success: true, message: messages.url_shortened_successfully, object: newUrl._id, code: 200 };
        } catch (error) {
            console.error(error);
            return { success: false, message: messages.something_went_wrong, code: 500 };
        }
    }

    public async shortenUrlCustom(url: string, customUrl: string): Promise<IServiceResponse> {
        try {
            if (!this.urlRegex.test(url)) {
                return { success: false, message: messages.invalid_url_format, code: 400 };
            }
            if (!this.customPathRegex.test(customUrl)) {
                return { success: false, message: messages.custom_path_invalid, code: 400 };
            }

            const existingUrl = await this.checkExistingUrl(url, customUrl);
            if (existingUrl) {
                return { success: false, message: messages.custom_path_already_used, object: existingUrl._id, code: 400 };
            }

            const newUrl = new Url({ _id: customUrl, custom: true, originalUrl: url });
            await newUrl.save();
            return { success: true, message: messages.url_shortened_successfully, object: newUrl._id, code: 200 };
        } catch (error) {
            console.error(error);
            return { success: false, message: messages.something_went_wrong, code: 500 };
        }
    }

    private async checkExistingUrl(url: string, customUrl?: string): Promise<IUrl | null> {
        try {
            const query: Partial<IUrl> = customUrl
                ? { _id: customUrl, originalUrl: url, custom: true }
                : { originalUrl: url, custom: false };

            const existingUrl = await Url.findOne(query);

            return existingUrl?.toObject() as IUrl;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default new UrlService();