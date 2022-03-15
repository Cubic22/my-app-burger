import React from "react";

import burgerLlogo from '../../assets/images/burger.png';
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLlogo} alt="MyBurger"/>
    </div>
);

export default Logo;