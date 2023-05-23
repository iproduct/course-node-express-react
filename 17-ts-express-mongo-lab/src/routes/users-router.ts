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

import { Router } from 'express';
import { AppError } from '../model/errors';
import { UserRepository } from '../dao/mongo-repository';
import * as indicative from 'indicative';
import * as bcrypt from 'bcryptjs';
import { User } from '../model/user.model';
import { userInfo } from 'os';

const router = Router();

router.get('/', (req, res, next) =>
    (<UserRepository>req.app.locals.userRepo).findAll()
        .then(users => res.json(users.map(user => { delete user.password; return user; })))
        .catch(next));

router.get('/:id', async (req, res, next) => {
    // validate id
    try {
        const id = req.params.id;
        await indicative.validator.validate({ id }, {
            id: 'required|regex:^[0-9a-fA-F]{24}$'
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }
    // find user
    try {
        const found = await (<UserRepository>req.app.locals.userRepo).findById(req.params.id);
        delete found.password;
        res.json(found); //200 OK with deleted user in the body
    } catch (err) {
        next(err);
    }

});

router.post('/', async (req, res, next) => {
    // validate new user
    const newUser = req.body;
    try {
        await indicative.validator.validate(newUser, {
            _id: 'regex:^[0-9a-fA-F]{24}$',
            title: 'required|string|min:3|max:30',
            text: 'required|string|min:3|max:1024',
            // authorId: 'required|regex:^[0-9a-fA-F]{24}$',s
            imageUrl: 'url',
            categories: 'array',
            'categories.*': 'string',
            keywords: 'array',
            'keywords.*': 'string',
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }
    // create user in db
    try {

        const found = await (<UserRepository>req.app.locals.userRepo).findByUsername(newUser.username);
        if(found) {
            throw new AppError(400, `Username already taken: '${newUser.username}'.`);
        }

        // hash password
        newUser.password = await bcrypt.hash(newUser.password, 8);

        // Create new User
        const created = await (<UserRepository>req.app.locals.userRepo).add(newUser);
        delete created.password;

        res.status(201).location(`/api/users/${newUser.id}`).json(newUser);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    // validate edited user
    const user = req.body as User;
    try {
        await indicative.validator.validate(user, {
            _id: 'required|regex:^[0-9a-fA-F]{24}$',
            // title: 'required|string|min:3|max:30',
            // text: 'required|string|min:3|max:1024',
            // // authorId: 'required|regex:^[0-9a-fA-F]{24}$',s
            // imageUrl: 'url',
            // categories: 'array',
            // 'categories.*': 'string',
            // keywords: 'array',
            // 'keywords.*': 'string',
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }

    try {
        const userId = req.params.id;

        if (userId !== user._id) {
            next(new AppError(400, `IDs in the URL and message body are different.`));
            return;
        }
        const found = await (<UserRepository>req.app.locals.userRepo).findById(req.params.id);
        if (user.username && user.username.length > 0 && found.username !== user.username) {
            throw new AppError(400, `Can not change username.`);
        }
        // _id and authorId are unmodifiable
        user._id = found._id;
        user.username = found.username;
        delete user.password;
        const updated = await (<UserRepository>req.app.locals.userRepo).edit(user);
        res.json(updated); //200 OK with user in the body
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
     // validate id
     try {
        const id = req.params.id;
        await indicative.validator.validate({ id }, {
            id: 'required|regex:^[0-9a-fA-F]{24}$'
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }
    try {
        const userId = req.params.id;
        const deleted = await (<UserRepository>req.app.locals.userRepo).deleteById(userId);
        delete deleted.password;
        res.json(deleted); //200 OK with deleted user in the body
    } catch (err) {
        next(err);
    }
});

export default router;
