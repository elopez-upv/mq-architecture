import { logger } from '../utils/index.js'

export default function requestHandler(controller) {
    return async (req, res) => {
        logger.info(`[requestHandler][${req.id}] Iniciando request`)
        const httpRequest = {
            id: req.id || '',
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
                logger.error(`[requestHandler][${req.id}] Error interno`)
                res.setHeader('Content-Type', 'application/problem+json')
            } else {
                logger.info(`[requestHandler][${req.id}] Request Exitosa`)
                res.setHeader('Content-Type', 'application/json')
            }

            res.status(httpResponse.statusCode)
            logger.info(`[requestHandler][${req.id}] code: ${httpResponse.statusCode}`)
            logger.info(`[requestHandler][${req.id}] Request Finalizada`)
            res.send({ id: req.id, ...httpResponse.body })
        } else {
            logger.error(`[requestHandler][${req.id}] Error interno`)
            res.status(500)
            res.setHeader('Content-Type', 'application/problem+json')
            const response = {
                id: req.id,
                result: 'ERROR',
                type: 'about:blank',
                title: 'Internal Server Error',
                status: 500,
                detail: 'An internal server error ocurred',
                description: {
                    errorCode: '7005',
                    detail: 'Error Interno, Intente nuevamente'
                }
            }
            logger.error(`[requestHandler][${req.id}] code: 500 response`)
            logger.error(`[requestHandler][${req.id}] Request Finalizada`)
            res.send(response)
        }
    }
}
