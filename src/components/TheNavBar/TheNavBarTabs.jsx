import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabPathToIndex = {
    '/': 0,
    '/fonts': 1,
    '/users': 2,
}

export const TheNavBarTabs = () => {
    const { pathname } = useLocation();

    const [selectedTab, setSelectedTab] = useState(tabPathToIndex[pathname]);

    const handleTabChange = (_event, newSelectedTab) => setSelectedTab(newSelectedTab);

    return (
        <Tabs 
            value={selectedTab}
            onChange={handleTabChange} 
            aria-label='Itens de menu'
            textColor='inherit'
            indicatorColor='secondary'
        >
            <Tab label='Obras' component={Link} to='/'/>
            <Tab label='Fontes' component={Link} to='/fonts'/>
            <Tab label='Usuários' component={Link} to='/users'/>
        </Tabs>
    );
}