import React, {Component} from "react";

import ReactAux from '../ReactAux/ReactAux';
import classes from './Layout.css'
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state= {
        showSideDraw: false
    }
    sideDrawCloseHandler = () => {
        this.setState({showSideDraw: false});
    }

    sideDrawToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDraw: !prevState.showSideDraw};
        })
    }

    render () {
        return (
            <ReactAux>
        <ToolBar drawToggleClicked={this.sideDrawToggleHandler}/>
        <SideDrawer 
            open={this.state.showSideDraw}
            closed={this.sideDrawCloseHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </ReactAux>
        )
    }
}
export default Layout;