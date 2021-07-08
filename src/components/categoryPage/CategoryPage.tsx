import React, { Fragment, useState } from 'react';
import './CategoryPage.scss'
import CardContainer from './CardContainer';
import Header from '../header';
import data from './cards.json';
import { useEffect } from 'react';

const CategoryPage: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [activeLink, setActiveLink] = useState(false);

    return( 
        <Fragment>
        <Header isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive} menuActive={menuActive} /* onActiveLink={setActiveLink} activeLink={activeLink} *//>       
            <CardContainer isChecked={isChecked} onToggle={setIsChecked} onOpenClose={setMenuActive}/>
        </Fragment>
    )
}

export default CategoryPage;