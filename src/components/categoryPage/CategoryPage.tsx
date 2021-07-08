import React, { Fragment, useState } from 'react';
import './CategoryPage.scss'
import CardContainer from './CardContainer';
import Header from '../header';

const CategoryPage: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
 
    
    return( 
        <Fragment>
        <Header isChecked={isChecked} onToggle={setIsChecked}/>       
            <CardContainer isChecked={isChecked} onToggle={setIsChecked}/>
        </Fragment>
    )
}

export default CategoryPage;