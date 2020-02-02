import React from 'react';
import './MeditationList.css';

class MeditationList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ul className="meditation-list">
                    {this.props.items.map(item => (
                        <React.Fragment key={item.id}>
                            <MeditationItem item={item} deleteMeditation={this.props.deleteMeditation}/>
                        </React.Fragment>
                    ))}
                </ul>
            </React.Fragment>
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
            <li className="meditation-list-item">
                <div className="meditation-list-item-text">
                    {this.props.item.text}
                    <button className="meditation-list-item-delete" onClick={this.delete.bind(this)}>X</button>
                </div>
            </li>
        )
    };
  
    delete(e){
        e.preventDefault();
        this.props.deleteMeditation(this.props.item);
    }
}

export default MeditationList;