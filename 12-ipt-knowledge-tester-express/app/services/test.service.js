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

import $ from 'jquery';

class TestService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getTests() {
        return this.getJsonAsPromise(this.url)
            .then((tests) => tests.map(
                (test) => {
                    if (!test.questions)
                        test.questions = [];
                    return test;
                })
            );
    }

    getTestById(testId) {
        return this.getJsonAsPromise(`${this.url}/${testId}`)
            .then((test) => {
                if (!test.questions)
                    test.questions = [];
                return test;
            });
    }

    addNewTest(test) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(test),
                }).done(resolve).fail(reject);
            }
        );
    }

    editTest(test) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${test.id}`,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(test),
                }).done(resolve).fail(reject);
            }
        );
    }

    deleteTest(testId) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${testId}`,
                    dataType: 'json',
                    type: 'DELETE'
                }).done(resolve).fail(reject);
            }
        );
    }

    getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}

export default TestService;