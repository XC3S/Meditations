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
  Route
} from "react-router-dom";


import Header from './components/Header';
import MeditationList from './components/MeditationList';
import CreateForm from './components/CreateForm';

Amplify.configure(awsconfig);



class MeditationsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: []};
    
    this.deleteMeditation = this.deleteMeditation.bind(this);
    this.createMeditation = this.createMeditation.bind(this);
  }

  render() {
    return (
      <Router>
        <div className="header">
          <Header />
          
          <Switch>
            <Route path="/create">
              <div>
                <h4>Write</h4>
                <CreateForm createMeditation={this.createMeditation}/>
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
   
   // set local state
   this.setState(state => ({
      items: load,
      text: ''
    }));
  }
  
  async deleteMeditation(item){
    // remote localy
    _.remove(this.state.items,meditation => meditation.id === item.id);
    this.setState(state => ({
      items: this.state.items
    }));
    
    // remove from datastore
    const toDelete = await DataStore.query(Meditation, item.id);
    DataStore.delete(toDelete);
  }

  async createMeditation(text){
    // add to datasore
    const newMeditation = await DataStore.save(
      new Meditation({
        text:text
      })
    );
    
    // add to local state
    const created = newMeditation[0];
    const newItem = {
      text: created.text,
      id: created.id
    };
    
    this.setState(state => ({
      items: state.items.concat(newItem)
    }));
  }
}



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

export default withAuthenticator(MeditationsApp, { 
  signUpConfig,
  usernameAttributes: 'email'
});