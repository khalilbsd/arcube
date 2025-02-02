import { getOriginalUrl, shortenUrl } from "controller/url.controller.js";
import { Router } from "express";


const router = Router()



router
    .get('/:shortenedID', getOriginalUrl)
    .post('/shorten', shortenUrl)



export default router