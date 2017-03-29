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

const Joi = require('joi');
const Users = require('./user.handlers');

const userSchema = Joi.object({
          id: Joi.string().allow(''),
          email: Joi.string().min(5).required(),
          fname: Joi.string().min(2).required(),
          lname: Joi.string().min(2).required(),
          password: Joi.string().min(8).required(),
          role: Joi.string().required()
        });

module.exports = [{
  method: 'GET',
  path: '/api/users',
  handler: Users.findAll
},
  {
    method: 'GET',
    path: '/api/users/{userId}',
    handler: Users.find,
    config: {
      validate: {
        params: {
          userId: Joi.string().length(24).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: Users.create,
    config: {
      validate: {
        payload: userSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/users/{userId}',
    handler: Users.edit,
    config: {
      validate: {
        params: {
          userId: Joi.string().length(24).required()
        },
        payload: userSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/users/{userId}',
    handler: Users.remove,
    config: {
      validate: {
        params: {
          userId: Joi.string().length(24).required()
        }
      }
    }
  }];