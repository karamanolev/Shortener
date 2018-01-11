import React from 'react';
import {API} from './API.js';

export class CreateLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullUrl: '',
            hash: '',
        };
    }

    async createLink() {
        const resp = await API.createLink(this.state.fullUrl),
            data = await resp.json();
        this.setState({
            hash: data.hash,
        });
    }

    urlFromHash(hash) {
        return (
            window.location.protocol + '//' +
            window.location.host +
            '/v1/' +
            hash
        );
    }

    renderHash() {
        if (!this.state.hash) {
            return null;
        }

        return <div className="form-group">
            <label>Your short URL is ready:</label>
            <input className="form-control" readOnly={true}
                   value={this.urlFromHash(this.state.hash)}/>
        </div>
    }

    render() {
        return <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="form-group">
                    <label>Enter your URL for shortening:</label>
                    <input className="form-control"
                           value={this.state.fullUrl}
                           onChange={e => this.setState({fullUrl: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary"
                        onClick={() => this.createLink()}>
                    Submit
                </button>

                {this.renderHash()}
            </div>
        </div>;
    }
}
