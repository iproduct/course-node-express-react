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

export function getMaxId( objectCollection ) {
    let maxId = 0;
    objectCollection.forEach((obj) => {
        if(maxId < obj.id)
            maxId = obj.id;
    });
    return maxId;
}

export function findById( objectCollection, objectId ) {
    for(let i = 0; i < objectCollection.length; i++){
        if(objectCollection[i].id === objectId) return objectCollection[i];
    }
    return null;
}

export function removeById( objectCollection, objectId ) {
    return objectCollection.filter((obj) => {
        return obj.id !== objectId;
    });
}

export function setById( objectCollection, objectId, newObject ) {
    return objectCollection.map((obj) => {
        return (obj.id === objectId) ? newObject : obj;
    });
}