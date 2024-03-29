import { SearchForm } from '../SearchForm/SearchForm';

import styles from '../../styles/Home.module.css';

export const Home = () => {
    return (
        <div className={styles.container}>
            <section className="title">
                <h1>Welcome to Football Stats</h1>
                <h3>Choose a league below to get started!</h3>
            </section>
            <SearchForm />
        </div>
    );
};
