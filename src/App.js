import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Meditation } from "./models";
import _ from "lodash";

import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

Amplify.configure(awsconfig);

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    }
  ]
};

class MeditationsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMeditation = this.deleteMeditation.bind(this);
  }

  render() {
    return (
      <Router>
        <div className="header">
          <h3>Meditation</h3>
          <div className="nav">
            <ul className="nav-list">
              <li>
                <Link to="/">Read</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </ul>
          </div>

          <Switch>
            <Route path="/create">
              <div>
                <h4>Write</h4>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="new-meditation">
                    What needs to be done?
                  </label>
                  <input
                    id="meditation"
                    onChange={this.handleChange}
                    value={this.state.text}
                  />
                  <button>
                    Add #{this.state.items.length + 1}
                  </button>
                </form>
              </div>
            </Route>
            <Route path="/">
              <h4>List</h4>
              <MeditationList items={this.state.items} deleteMeditation={this.deleteMeditation}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  componentDidMount() {
    this.loadMeditations();
  }
  
  
  
  async loadMeditations() {
    // Load todos from DataStore
    let dataStoreItems = await DataStore.query(Meditation);
    let load = _.map(dataStoreItems, item => {
      return {
        id: item.id,
        text: item.text,
      };
    });
   //this.state.text = load;
   
   this.setState(state => ({
      items: load,
      text: ''
    }));
   
   console.log("load:",load);
  }
  
  async deleteMeditation(item){
    console.log("delete", item);
    _.remove(this.state.items,meditation => meditation.id === item.id);
    this.setState(state => ({
      items: this.state.items
    }));
    
    const toDelete = await DataStore.query(Meditation, item.id);
    DataStore.delete(toDelete);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    
    const newMeditation = await DataStore.save(
      new Meditation({
        text: this.state.text
      })
    );
    
    const created = newMeditation[0];
    
    const newItem = {
      text: created.text,
      id: created.id
    };
    
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class MeditationList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <div key={item.id}>
            <MeditationItem item={item} deleteMeditation={this.props.deleteMeditation}/>
          </div>
        ))}
      </ul>
    );
  }
  
  onCancelClick(e){
    e.preventDefault();
    console.log(e);
    //this.props.deleteTodo(this.props);
  }
}

class MeditationItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.item.text} <span style={{color: '#cac1c1'}}>{this.props.item.id}</span> <button onClick={this.delete.bind(this)}>X</button>
      </li>
    )
  };
  
  delete(e){
    e.preventDefault();
    this.props.deleteMeditation(this.props.item);
  }
}



export default withAuthenticator(MeditationsApp, { 
  signUpConfig,
  usernameAttributes: 'email'
});