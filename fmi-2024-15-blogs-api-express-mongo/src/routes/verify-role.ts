/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './../dao/mongo-repository';
import { AppError } from '../model/errors';
import { Role } from '../model/user.model';


export function verifyRole(roles: Role[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const paramUserId = req.params.userId;
    const userId = req['userId'];

    if (!userId) next(new AppError(403, `No userId provided.`)); //Error
    try {
      const user = await (<UserRepository>req.app.locals.userRepo).findById(userId)
      if (!user) {
        next(new AppError(404, `User not found.`)); //Error
        return;
      }
      if (roles.some(role => user.roles.some(r => r === role))) { // if the interection between required and actual user roles is not empty
        delete user.password;
        // if everything good, save user to request for use in other routes
        req['user'] = user;
        next();
      } else {
        next({ status: 403, message: `Not enough privilegies for this operation.` }); //Error
      }
    } catch (err) {
      next(err);
    }
  }
}


