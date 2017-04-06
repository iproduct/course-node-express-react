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

import React from 'react'

export default React.createClass({
  render() {
    return (
      <main>
        <h2>About: IPT Knowledge Tester</h2>
        <p>Copyright &copy; 2016 by 
        <a href="http://iproduct.org/en/" target="_blank"> IPT - Intellectual Products & Technologies Ltd.</a>. All rights reserved.
        </p>
        <section>
          <p>
            IPT Knowledge Tester provides ability for instructors to define tests, and for  students to test their knowledge and abilities.
            In addition to that it allows users to register, and administrators to manage them. The system is implemented as a Single Page 
            Application (SPA) using <em>React.js</em> as front-end, and <em>Node.js</em> and <em>Hapi.js</em> as backend technologies.
          </p>
        </section>
    </main>
  );
        }
});
