import styles from "../../styles/Home.module.css";
import { Form } from "../SearchForm/SearchForm";

export const Home = (props) => {
    const { setId } = props;

    return (
        <div className={styles.container}>
            <section className="title">
                <h1>Welcome to Football Stats</h1>
                <h3>Choose a league below to get started!</h3>
            </section>
            <Form setId={setId} />
        </div>
    );
};
