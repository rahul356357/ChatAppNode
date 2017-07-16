const router = require('express').Router();
const db = require('../db');

let _registerRoute = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key])instanceof Array) {
            _registerRoute(routes[key], key)
        } else {
            if (method === 'get') {
                router.get(key, routes[key])
            } else if (method === 'post') {
                router.post(key, routes[key])
            } else {
                router.use(routes[key])
            }
        }
    }
}

let findOne = profileid => {
    return db
        .userModel
        .findOne({'profileId': profileid})
}

let createNewUser = profile => {
    return new Promise = (resolve, reject) => {
        let newChatUSer = new db.userModel({
            profileId: profile.id,
            fullName: profile.dispalyName,
            profilePic: profile.photo[0].value || ''
        });
        newChatUSer.save(error => {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                resolve(newChatUSer);
            }
        })
    }
}
// The ES6 promisified version of findById
let findById = id => {
	return new Promise((resolve, reject) => {
		db.userModel.findById(id, (error, user) => {
			if(error) {
				reject(error);
			} else {
				resolve(user);
			}
		});
	});
}
let route = routes => {
    _registerRoute(routes);
    return router;
}
module.exports = {
    route,
    findOne,
    createNewUser,
    findById
}