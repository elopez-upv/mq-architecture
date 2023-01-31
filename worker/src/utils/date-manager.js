export default function makeDateManager({ moment }) {
    function getSysdate() {
        return moment().tz('Europe/Madrid').format()
    }

    function getElapsedTime(createdAt) {
        const now = getSysdate()
        const elapsedTime = moment(now).diff(moment(createdAt))
        return elapsedTime
    }

    return Object.freeze({
        getSysdate,
        getElapsedTime
    })
}
