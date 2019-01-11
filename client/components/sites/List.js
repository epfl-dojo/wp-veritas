import React from 'react';
import { NavLink } from 'react-router-dom';
import apiWPSite from '../../conf/api.wp_site';
import { Sites } from '../../../sites.js';
import { withTracker } from 'meteor/react-meteor-data';

class Cells extends React.Component {
    render() {
        return (
            <tbody>
                {this.props.sites.map( (site, index) => (
                    <tr key={site._id}>
                        <th scope="row">{index+1}</th>
                        <td>{site.url}</td>
                        <td>{site.tagline}</td>
                        <td>{site.title}</td>
                        <td>{site.openshift_env}</td>
                        <td>{site.type}</td>
                        <td>{site.theme}</td>
                        <td>{site.faculty}</td>
                        <td>{site.language}</td>
                        <td>{site.unit_id}</td>
                        <td>{site.snow_number}</td>
                        <td>
                            <NavLink activeClassName="active" to={`/edit/${site._id}`}>Éditer</NavLink>
                            <button type="button" className="close" aria-label="Close">
                                <span  onClick={() => this.props.deleteSite(site._id)} aria-hidden="true">&times;</span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }
}

class List extends React.Component {


    deleteSite = (siteID) => {
        const sites = [...this.state.sites.filter(site => site._id !== siteID)];
        this.setState({sites});

        apiWPSite.delete('/sites/' +  siteID)
            .then( res => console.log(res) )
    }

    render() {
        return (
            <div className="container-full ml-4 mr-4">
                <h2 className="p-4">Source de vérité des sites WordPress</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">URL</th>
                            <th scope="col">Tagline</th>
                            <th scope="col">Titre</th>
                            <th scope="col">OpenShift Env</th>
                            <th scope="col">Type</th>
                            <th scope="col">Thème</th>
                            <th scope="col">Faculté</th>
                            <th scope="col">Langue</th>
                            <th scope="col">Unit ID</th>
                            <th scope="col">N°ticket Snow</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <Cells sites={this.state.sites} deleteSite={ this.deleteSite }/>
                </table>
            </div>
        );
    }
}

export default withTracker(() => {
  return {
    sites: Sites.find({}).fetch(),
  };
})(List);
