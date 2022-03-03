import Header from './Header'

import Basket from '../pages/Basket';
import Pantry from '../pages/Pantry';
import Manage from '../pages/Manage';
import { useState } from 'react';

export default function Layout({ page }) {

    const [statusCount, setStatusCount] = useState('0/0');

    return (
        <>
            <nav>
                <Header statusCount={statusCount} />
            </nav>
            <section className="container">
                {(() => {
                    switch (page) {
                        case 'basket': return <Basket setStatusCount={setStatusCount} />
                        case 'pantry': return <Pantry />
                        case 'manage': return <Manage />

                        default:
                            return null
                    }
                })()}
            </section>
        </>
    )
}