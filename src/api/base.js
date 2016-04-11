'use strict';
class BaseApi {

    serializer (data) {
        if (!data.id) {
            if (data['null']) {
                data['id'] = data['null'];
            }
            else {
                data['id'] = 0;
            }
        }
        var json = JSON.stringify(data);
        var model = JSON.parse(json);
        if (model.user) {
            delete model.user['password'];
            delete model.user['createdAt'];
            delete model.user['updatedAt'];
        }
        return model;
    }

    serializerList(collection) {
        var json = JSON.stringify(collection);
        return JSON.parse(json);
    }

    success (req, res, model) {
        if (model.length) {
            res.json({
                data: this.serializerList(model),
                error: [],
                meta: {}
            });
        }
        else {
            res.json({
                data: this.serializer(model),
                error: [],
                meta: {}
            });
        }
	}

	error (req, res, err, status) {
	    var code = status || 400;
	    var error = {
	        url: '/api/v1' + req.url,
	        data: req.body ? JSON.stringify(req.body) : '',
	        params: req.params ? JSON.stringify(req.params) : '',
	        message: err.message ? err.message : '',
	        stack: err.stack ? err.stack : '',
	        status: code
	    }
		res.status(code).json({
            data: [],
            error: error
		});
	}

	endpoints () {
        return { };
	}
}

module.exports = BaseApi;
