import Axios from "axios";
/* @Desc
this only servers to abstract the axios package to generate a consistent variable to use during the session of the user
to add authorization token to headers later in not added to each request
*/

const axios = Axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

axios.interceptors.request.use((config) => {
        //we can set headers here to add some kind of auth headers
    return config;
  });


export default axios;