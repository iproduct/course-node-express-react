/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
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
const Comments = require('./handlers/comments.handlers');

module.exports = [{
  method: 'GET',
  path: '/api/comments',
  handler: Comments.findAll
},
  {
    method: 'GET',
    path: '/api/comments/{commentId}',
    handler: Comments.find,
    config: {
      validate: {
        params: {
          commentId: Joi.number().integer().min(1).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/comments',
    handler: Comments.create,
    config: {
      validate: {
        payload: Joi.object({
          id: Joi.number().integer().min(1).optional(),
          author: Joi.string().min(2).required(),
          text: Joi.string().required(),
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/comments/{commentId}',
    handler: Comments.remove,
    config: {
      validate: {
        params: {
          commentId: Joi.number().integer().min(1).required()
        }
      }
    }
  }];