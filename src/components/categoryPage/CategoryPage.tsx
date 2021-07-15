import React, { Fragment, useEffect, useState } from 'react';
import './CategoryPage.scss'
import CardContainer from './CardContainer';
import Header from '../header';

const CategoryPage: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [activeLink, setActiveLink] = useState(false);

    return( 
        <Fragment>
       <Header isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive} menuActive={menuActive}/>
            <CardContainer isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive} menuActive={menuActive}/>
        </Fragment>
    )
}

export default CategoryPage;