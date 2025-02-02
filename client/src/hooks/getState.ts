import { useSelector } from "react-redux";

function useGetStateFromStore(slice: string, attribute?: string) {
    return useSelector((state: any) => {
        const sliceState = state[slice];
        return attribute ? sliceState[attribute] : sliceState;
    });

}

export default useGetStateFromStore;
