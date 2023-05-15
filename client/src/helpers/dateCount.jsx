export const dateCount = (time) => {
    const differenceInTime = Math.floor(new Date().getTime() - new Date(time).getTime(time))
    const diffInSeconds = Math.floor(differenceInTime / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays > 0) {
        return new Date(time).toLocaleDateString()
    }
    if(diffInHours > 3 && diffInHours < 24) {
        return diffInHours + ' hour ago'
    }
    if(diffInHours < 3) {
        return new Date(time).toLocaleTimeString()
    }
}
export const sortLastByTime = (messages) => {
    const sortMessages = messages?.sort(el => new Date(el.timestamp).getTime() - new Date(el.timestamp).getTime())
    return sortMessages
}
export const onlyHourMinutes = (time) => {
    const onlyHourMinutes = new Date(time).getHours() + ':' + ((new Date(time).getMinutes() >= 10 )
    ? new Date(time).getMinutes() : ('0' + new Date(time).getMinutes()))
    return onlyHourMinutes
}