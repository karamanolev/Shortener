import React from 'react';
import {API} from './API';
import {ManageMapping} from './ManageMapping.jsx';

export class ManageLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            mapping: null,
            mappingNotFound: false,
        };
    }

    async searchMapping() {
        let query = this.state.query;
        const index = query.lastIndexOf('/');
        if (index !== -1) {
            query = query.substring(index + 1);
        }
        const resp = await API.getLink(query);
        if (resp.status === 200) {
            const data = await resp.json();
            this.setState({
                mapping: data,
                mappingNotFound: false,
            });
        } else {
            this.setState({
                mapping: null,
                mappingNotFound: true,
            });
        }
    }

    onMappingDelete() {
        this.setState({
            query: '',
            mapping: null,
            mappingNotFound: false,
        });
        alert('Successfully deleted the hash.');
    }

    renderMapping() {
        if (this.state.mappingNotFound) {
            return <h4><p>Such a hash wasn't found.</p></h4>;
        }
        if (this.state.mapping === null) {
            return null;
        }
        return <ManageMapping onDelete={() => this.onMappingDelete()}
                              {...this.state.mapping}/>;
    }

    render() {
        return <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="form-group">
                    <label>Search by hash:</label>
                    <input className="form-control"
                           value={this.state.query}
                           onChange={e => this.setState({query: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary"
                        onClick={() => this.searchMapping()}>
                    Search
                </button>

                {this.renderMapping()}
            </div>
        </div>;
    }
}
