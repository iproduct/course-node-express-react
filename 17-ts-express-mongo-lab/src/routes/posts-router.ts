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
import { verifyToken } from './verify-token';
import { verifyRole } from './verify-role';
import { Role } from '../model/user.model';

const router = Router();

router.get('/', (req, res, next) =>
    (<PostRepository>req.app.locals.postRepo).findAll()
        .then(posts => res.json(posts))
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
    // find post
    try {
        const found = await (<PostRepository>req.app.locals.postRepo).findById(req.params.id)
        res.json(found); //200 OK with deleted post in the body
    } catch (err) {
        next(err);
    }

});

router.post('/', verifyToken, verifyRole([Role.AUTHOR, Role.ADMIN]), function (req, res, next) {
    // validate new post
    const newPost = req.body;
    indicative.validator.validate(newPost, {
        _id: 'regex:^[0-9a-fA-F]{24}$',
        title: 'required|string|min:3|max:30',
        text: 'required|string|min:3|max:1024',
        // authorId: 'required|regex:^[0-9a-fA-F]{24}$',s
        imageUrl: 'url',
        categories: 'array',
        'categories.*': 'string',
        keywords: 'array',
        'keywords.*': 'string',
    }).then(async () => {
        // create post in db
        try {

            //TODO set correct author
            // const defaultUser = await (<UserRepository>req.app.locals.userRepo).findByUsername("trayan");
            // newPost.authorId = defaultUser._id;

            // Create new User
            const created = await(<PostRepository>req.app.locals.postRepo).add(newPost);

            res.status(201).location(`/api/posts/${newPost.id}`).json(newPost);
        } catch (err) {
            next(err);
        }
    }).catch(err => next(new AppError(400, err.message, err)));
});

router.put('/:id', async function (req, res, next) {
    // validate edited post
    const post = req.body;
    try {
        await indicative.validator.validate(post, {
            _id: 'required|regex:^[0-9a-fA-F]{24}$',
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

    try {
        const postId = req.params.id;

        if (postId !== post._id) {
            next(new AppError(400, `IDs in the URL and message body are different.`));
            return;
        }
        const found = await (<PostRepository>req.app.locals.postRepo).findById(req.params.id);
        if (post.authorId && post.authorId.length > 0 && found.authorId !== post.authorId) {
            throw new AppError(400, `Can not change Post's author.`);
        }
        // _id and authorId are unmodifiable
        post._id = found._id;
        post.authorId = found.authorId;
        const updated = await (<PostRepository>req.app.locals.postRepo).edit(post);
        res.json(updated); //200 OK with post in the body
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
        const postId = req.params.id;
        const deleted = await (<PostRepository>req.app.locals.postRepo).deleteById(postId);
        res.json(deleted); //200 OK with deleted post in the body
    } catch (err) {
        next(err);
    }
});

export default router;
