
import { EAppNotification } from "enums/EAppNotification";
import { toast, ToastOptions } from "react-toastify";


const style: ToastOptions = {
    position: "bottom-center",
    // autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
}

export const notify = (state: EAppNotification, message: string) => {
    style.theme = state === 'error' ? "colored" : "dark";
    return toast[state](message, style)
}

