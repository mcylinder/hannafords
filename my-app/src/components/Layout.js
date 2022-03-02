import Header from './Header'

import Basket from '../pages/Basket';
import Pantry from '../pages/Pantry';
import Manage from '../pages/Manage';

export default function Layout({ page }) {

    return (
        <>
            <nav>
                <Header />
            </nav>
            <section className="container">
                {(() => {
                    switch (page) {
                        case 'basket': return <Basket />
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