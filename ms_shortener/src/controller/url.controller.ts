import { AppError, ElementNotFound, MissingParameter } from "errors/appError.js";
import { NextFunction, Request, Response } from "express";
import { messages } from "i18n/messages.eng.js";
import urlService from "services/url.service.js";
import { IUrl } from "types/IUrl.interface.js";
import { catchAsync } from "utils/catchAsync.js";





export const getOriginalUrl = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { shortenedID } = req.params;
    if (!shortenedID) return next(new ElementNotFound(messages.invalid_shortened_url))
    const { success, message, object, code } = await urlService.getOriginalUrl(shortenedID) as { success: boolean, message: string, object: string, code: number }
    if (!success) return next(new AppError(message, code))
    return res.status(code).json({ success, message, originalUrl: object })

})

export const shortenUrl = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { url, customUrl }: { url: string, customUrl?: string } = req.body;
    if (!url) return next(new MissingParameter("url is missing from the request"))

    if (customUrl) {
        const { success, message, object, code } = await urlService.shortenUrlCustom(url, customUrl) as { success: boolean, message: string, object: IUrl, code: number }
        if (!success) return next(new AppError(message, code))
        return res.status(code).json({ success, message, shortenedUrl: object })

    }
    const { success, message, object, code } = await urlService.shortenUrl(url) as { success: boolean, message: string, object: IUrl, code: number }
    if (!success) return next(new AppError(message, code))

    return res.status(code).json({ success, message, shortenedUrl: object })
})


