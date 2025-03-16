const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "*", // 프록시를 적용할 경로
        createProxyMiddleware({
            target: "http://localhost:8080", // 요청을 보낼 서버
            changeOrigin: true, // Origin을 타겟 서버로 변경
        })
    );
};
