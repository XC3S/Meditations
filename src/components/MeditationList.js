import React from 'react';

class MeditationList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <React.Fragment key={item.id}>
            <MeditationItem item={item} deleteMeditation={this.props.deleteMeditation}/>
          </React.Fragment>
        ))}
      </ul>
    );
  }
  
  onCancelClick(e){
    e.preventDefault();
    console.log(e);
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

export default MeditationList;