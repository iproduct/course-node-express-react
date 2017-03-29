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
const Tests = require('./test.handlers');

module.exports = [{
  method: 'GET',
  path: '/api/tests',
  handler: Tests.findAll
},
  {
    method: 'GET',
    path: '/api/tests/{testId}',
    handler: Tests.find,
    config: {
      validate: {
        params: {
          testId: Joi.string().length(24).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/tests',
    handler: Tests.create,
    config: {
      validate: {
        payload: Joi.object({
          id: Joi.string().allow(''),
          title: Joi.string().min(2).required(),
          difficulty: Joi.string().required(),
          description: Joi.string().optional(),
          author: Joi.string().optional(),
          license: Joi.string().required(),
          questions: Joi.array().optional(),
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/tests/{testId}',
    handler: Tests.edit,
    config: {
      validate: {
        params: {
          testId: Joi.string().length(24).required()
        },
        payload: Joi.object({
          id: Joi.string().allow(''),
          title: Joi.string().min(2).required(),
          difficulty: Joi.string().required(),
          description: Joi.string().optional(),
          author: Joi.string().optional(),
          license: Joi.string().required(),
          questions: Joi.array().optional(),
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/tests/{testId}',
    handler: Tests.remove,
    config: {
      validate: {
        params: {
          testId: Joi.string().length(24).required()
        }
      }
    }
  }];