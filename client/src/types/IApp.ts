//this file is about declaring any interfaces that is  not data related but system related eg error , dates etc ...



export interface IServerError {
    data: {
        message: string
    },
    status: number
}