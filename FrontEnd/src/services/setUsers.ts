export const setUsersService = (data: { _id: string; username: string }[]) => {
    const result: any = []
    data.forEach((item) => {
        result.push({
            id: item._id,
            name: item.username
        })
    })
    return result
}