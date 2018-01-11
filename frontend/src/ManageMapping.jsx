import React from 'react';
import {API} from './API';

export class ManageMapping extends React.Component {
    delete() {
        if (confirm('Are you sure?')) {
            API.deleteLink(this.props.hash);
            if (this.props.onDelete) {
                this.props.onDelete();
            }
        }
    }

    render() {
        return <div>
            <div className="form-group">
                <label>Hash:</label>
                <input className="form-control"
                       value={this.props.hash}
                       readOnly={true}/>
            </div>
            <div className="form-group">
                <label>Full URL:</label>
                <input className="form-control"
                       value={this.props.fullUrl}
                       readOnly={true}/>
                <a href={this.props.fullUrl}>{this.props.fullUrl}</a>
            </div>
            <div className="form-group">
                <label>Created on:</label>
                <input className="form-control"
                       value={this.props.dateCreated}
                       readOnly={true}/>
            </div>
            <button className="btn btn-danger" onClick={() => this.delete()}>Delete</button>
        </div>
    }
}
