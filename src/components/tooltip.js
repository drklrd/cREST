import  React from 'react';

export  default class Tooltip extends React.Component{
    render(){
        return(

            <a href="#" data-toggle="tooltip" title={this.props.title}>
                {this.props.text}
            </a>

        )
    }
}