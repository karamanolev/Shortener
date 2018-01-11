import React from 'react';
import {Route} from 'react-router-dom';
import {Nav} from './Nav.jsx';
import {CreateLink} from './CreateLink.jsx';
import {ManageLinks} from './ManageLinks.jsx';

export default class ShortenerRoot extends React.Component {
    render() {
        return (
            <div className="container">
                <Nav/>
                <Route exact path="/" component={CreateLink}/>
                <Route path="/manage" component={ManageLinks}/>
            </div>
        );
    }
};
