import  React from 'react';
import AceEditor from 'react-ace';

export  default class Editor extends React.Component{
    render(){
        return(

            <AceEditor
                mode="javascript"
                theme="github"
                name="Response Area"
                value={this.props.response}
                height = "790px"
                width = "890px"
                fontSize = "20px"
                editorProps={{$blockScrolling: true}}
            />




        )
    }
}