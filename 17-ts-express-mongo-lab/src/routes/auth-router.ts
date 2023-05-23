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
import { PostRepository, UserRepository } from '../dao/mongo-repository';
import * as indicative from 'indicative';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { secret } from '../config/secret';
import { Role } from '../model/user.model';
import Credentials from '../model/auth';

const router = Router();

// Auth API Feature
router.post('/login', async (req, res, next) => {
    const db = req.app.locals.db;
    const credentials = req.body as Credentials;
    try {
        await indicative.validator.validate(credentials, {
            username: 'required',
            password: 'required|string|min:6'
        });
    } catch (err) {
        next(new AppError(400, err.message, err));
        return;
    }
    try {
        const user = await (<UserRepository>req.app.locals.userRepo).findByUsername(credentials.username);
        if (!user) {
            next(new AppError(401, `Username or password is incorrect.`));
            return;
        }
        const passIsValid = await bcrypt.compare(credentials.password, user.password);
        if (!passIsValid) {
            next(new AppError(401, `Username or password is incorrect.`));
            return;
        }
        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: '1h' //expires in 1h
        });
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }

});

router.post('/register', async (req, res, next) => {
    // validate new user
    const newUser = req.body;
    try {
        await indicative.validator.validate(newUser, {
            _id: 'regex:^[0-9a-fA-F]{24}$',
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
    // create user in db
    try {

        const found = await (<UserRepository>req.app.locals.userRepo).findByUsername(newUser.username);
        if (found) {
            throw new AppError(400, `Username already taken: "${newUser.username}".`);
        }

        throw new AppError(400, `Can not change username.`);

        // hash password
        newUser.password = await bcrypt.hash(newUser.password, 8);
        newUser.roles = [Role.READER, Role.AUTHOR];

        // Create new User
        const created = await (<UserRepository>req.app.locals.userRepo).add(newUser);
        delete created.password;

        res.status(201).location(`/api/users/${newUser.id}`).json(newUser);
    } catch (err) {
        next(err);
    }
});

export default router;