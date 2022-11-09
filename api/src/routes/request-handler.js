export default function requestHandler(controller) {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            host: req.get('host'),
            origin: req.get('origin') || req.socket.remoteAddress,
            query: req.query,
            protocol: req.protocol,
            params: req.params,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent'),
                authorization: req.get('authorization')
            }
        }

        const httpResponse = await controller(httpRequest)

        if (httpResponse) {
            if (httpResponse.headers) res.set(httpResponse.headers)

            if (
                httpResponse.statusCode === 409
                || httpResponse.statusCode === 404
                || httpResponse.statusCode === 400
            ) {
                res.setHeader('Content-Type', 'application/problem+json')
            } else {
                res.setHeader('Content-Type', 'application/json')
            }

            res.status(httpResponse.statusCode)

            res.send(httpResponse.body)
        } else {
            res.status(500)
            res.setHeader('Content-Type', 'application/problem+json')
            res.send({
                type: 'about:blank',
                title: 'Internal Server Error',
                status: 500,
                detail: 'An internal server error ocurred'
            })
        }
    }
}
