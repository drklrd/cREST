import  React from 'react';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';

export  default class Editor extends React.Component{
    render(){
        return(

            <div>


                <div className="col-xs-12">
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        name="Response Area"
                        value={this.props.response}
                        height = "790px"
                        width = "100%"
                        fontSize = "20px"
                        editorProps={{$blockScrolling: true}}
                    />


                </div>

            </div>






        )
    }
}