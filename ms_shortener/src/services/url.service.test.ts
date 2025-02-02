import { messages } from "i18n/messages.eng.js";
import Url from "models/urls.model.js";
import urlService from "services/url.service.js";

jest.mock('models/urls.model');
describe('UrlService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return success for a valid URL', async () => {
        (Url.findOne as jest.Mock).mockResolvedValue(null);
        Url.prototype.save = jest.fn().mockImplementation(function (this: typeof Url.prototype) {
            this._id = '12345';
            return this;
        });

        const response = await urlService.shortenUrl('https://example.com');
        expect(response).toEqual({
            success: true,
            message: messages.url_shortened_successfully,
            object: '12345',
            code: 200
        });
    });

    it('should return error for an invalid URL', async () => {
        const response = await urlService.shortenUrl('invalid-url');
        expect(response).toEqual({
            success: false,
            message: messages.invalid_url_format,
            code: 400
        });
    });

    it('should return success for a valid custom URL', async () => {
        (Url.findOne as jest.Mock).mockResolvedValue(null);
        Url.prototype.save = jest.fn().mockImplementation(function (this: typeof Url.prototype) {
            this._id = 'custom123';
            return this;
        });

        const response = await urlService.shortenUrlCustom('https://example.com', 'custom123');
        expect(response).toEqual({
            success: true,
            message: messages.url_shortened_successfully,
            object: 'custom123',
            code: 200
        });
    });

    it('should return error for an invalid custom URL format', async () => {
        const response = await urlService.shortenUrlCustom('https://example.com', 'https://invalid-custom-url');
        expect(response).toEqual({
            success: false,
            message: messages.custom_path_invalid,
            code: 400
        });
    });

    it('should return error for an already used custom URL', async () => {
        (Url.findOne as jest.Mock).mockResolvedValue({
            _id: 'custom123',
            originalUrl: 'https://example.com',
            custom: true,
            toObject: jest.fn().mockReturnValue({
                _id: 'custom123',
                originalUrl: 'https://example.com',
                custom: true
            })
        });

        const response = await urlService.shortenUrlCustom('https://example.com', 'custom123');
        expect(response).toEqual({
            success: false,
            message: messages.custom_path_already_used,
            object: 'custom123',
            code: 400
        });
    });
});