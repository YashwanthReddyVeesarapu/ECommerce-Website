export const loadState = () => {
    try {
        const searalizedState = localStorage.getItem('state');
        if (searalizedState === null)
            return undefined
        return JSON.parse(searalizedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serialState = JSON.stringify(state);
        localStorage.setItem('state', serialState);
    } catch (error) {
        //Ignore
    }
}