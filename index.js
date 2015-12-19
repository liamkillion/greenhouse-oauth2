var express = require('express'),
    app = express(),
    config = {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        site: 'https://app.greenhouse.io/',
        tokenPath: 'oauth/token',
        authorizationPath: 'oauth/authorize'
    },
    oauth2 = require('simple-oauth2')(config);

app.get('/auth', function (req, res) {
    var authorization_uri = oauth2.authCode.authorizeURL({
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'candidates.create candidates.view jobs.view',
        response_type: 'code'
    });

    res.redirect(authorization_uri);
});

app.get('/callback', function (req, res) {
    var code = req.query.code;
    console.log('/callback');
    console.log(code);
    oauth2.authCode.getToken({
        code: code,
        client_id: config.clientID,
        client_secret: config.clientSecret
    }, function(error, result) {
        if (error) { console.log('Access Token Error', error.message); }
        console.log(result);
    });
});

app.listen(3000);