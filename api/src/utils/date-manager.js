export default function makeDateManager({ moment }) {
    function getSysdate() {
        return moment().tz('Europe/Madrid').format()
    }

    return Object.freeze({
        getSysdate
    })
}
