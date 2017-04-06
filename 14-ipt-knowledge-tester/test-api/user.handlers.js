/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial usering and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

const mongodb = require('mongodb');
const assert = require('assert');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('users').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs.map((user) => {
                user.id = user._id;
                delete (user._id);
                return user;
            }));
        }
    );
};

exports.find = function (request, reply) {
    this.db.collection('users', function (err, users_collection) {
        if (err) throw err;
        users_collection.findOne({ _id: new mongodb.ObjectID(request.params.userId) },
            (err, user) => {
                if (err) throw err;
                if (user === null) {
                    reply(Boom.notFound(`User with Id=${request.params.userId} not found.`));
                } else {
                    user.id = user._id;
                    delete (user._id);
                    reply(user);
                }

            });
    });
};

exports.create = function (request, reply) {
    let user = request.payload;
    let collection = this.db.collection('users');
    console.log('Inserting user:', user);
    collection.insertOne(user).then((result) => {
        if (result.result.ok && result.insertedCount === 1) {
            const userUri = request.raw.req.url + '/' + user._id;
            reply(replaceId(user)).created(userUri);
        } else {
            reply(Boom.badRequest(`Invalid user data: ${user}`));
        }
    }).
        catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.edit = function (request, reply) {
    let user = request.payload;
    if (user.id !== request.params.userId) {
        reply(Boom.badRequest(`Invalid user data - id in url doesn't match: ${user}`));
        return;
    }
    user._id = new mongodb.ObjectID(user.id);
    delete (user.id);
    let collection = this.db.collection('users');
    console.log('Editing user:', user);
    collection.updateOne({ _id: new mongodb.ObjectID(user._id) }, { "$set": user })
        .then((result) => {
            user = replaceId(user);
            if (result.result.ok && result.modifiedCount === 1) {
                reply(user);
            } else {
                reply(Boom.badRequest(`Data was NOT modified in database: ${JSON.stringify(user)}`));
            }
        }).catch((err) => {
            reply(Boom.badImplementation(`Server error: ${err}`));
        });
};

exports.remove = function (request, reply) {
    let collection = this.db.collection('users');
    collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.userId) })
        .then((result) => {
            if (result.ok) {
                console.log('Deleted: ', request.raw.req.url);
                reply(replaceId(result.value));
            } else {
                reply(Boom.notFound(`User with Id=${request.params.userId} not found.`));
            }
        }).catch((err) => {
            reply(Boom.notFound(`User with Id=${request.params.userId} not found.`));
        });
};

function replaceId(user) {
    user.id = user._id;
    delete (user._id);
    return user;
}
