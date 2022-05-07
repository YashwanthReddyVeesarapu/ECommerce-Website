


export const handleCartData = ({ payload }) => {

    return new Promise((resolve, reject) => {
        const get = async () => {
            const res = await fetch(`https://rediva-lifestyle-default-rtdb.firebaseio.com/${payload}.json`, {
                method: "GET"
            })
            const data = await res.json();
            console.log(data)
        }
        get().then(() => resolve()).catch(() => reject())

    })

}