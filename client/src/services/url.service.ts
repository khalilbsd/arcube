import { useGetOriginalUrlMutation, useShortenUrlMutation } from "store/api/url.api"
import { EAppNotification } from "enums/EAppNotification"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLoading, setShortenedUrl } from "store/reducer/url.reducer"
import { IUrl } from "types/IUrl"
import { isTServerError } from "utils/httpErorr"
import { notify } from "./appNotification.service"

function useURlService() {
    const [getOriginalUrl, { isLoading: isGettingURl }] = useGetOriginalUrlMutation()
    const [shortenUrl, { isLoading: isShortening }] = useShortenUrlMutation()
    const dispatch = useDispatch()
    async function loadURL(id: string): Promise<string | null> {
        try {
            const { originalUrl } = await getOriginalUrl({ id }).unwrap()
            console.log("-------------------", originalUrl)
            return   originalUrl
        } catch (error: any) {
            if (isTServerError(error)) notify(EAppNotification.ERROR, error.data.message)
            console.error(error)
            return null
        }
    }
    async function shorten(data: IUrl) {
        try {
            const { shortenedUrl , message } = await shortenUrl(data).unwrap()
            notify(EAppNotification.SUCCESS, message)
            dispatch(setShortenedUrl(process.env.REACT_APP_DOMAIN + "/" + shortenedUrl))
        } catch (error: any) {
            if (isTServerError(error)) notify(EAppNotification.ERROR, error.data.message)
            console.error(error)

        }
    }

    useEffect(() => {
        dispatch(setLoading(isGettingURl || isShortening))
    }, [isGettingURl, isShortening])


    return { loadURL, shorten }

}


export default useURlService