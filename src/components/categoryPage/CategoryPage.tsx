import React, { Fragment, useState } from 'react';
import './CategoryPage.scss'
import CardContainer from './CardContainer';
import Header from '../header';
import data from './cards.json';

const CategoryPage: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
 
    

    return( 
        <Fragment>
        <Header isChecked={isChecked} onToggle={setIsChecked}/>       
            <CardContainer isChecked={isChecked} onToggle={setIsChecked} /* onUnSort={unSort} *//>
        </Fragment>
    )
}

export default CategoryPage;