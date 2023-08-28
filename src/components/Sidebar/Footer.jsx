import styles from '../../styles/Sidebar.module.css';

export const Footer = () => {
    return (
        <>
            <section className={styles.FooterLinks}>
                <a
                    href="https://github.com/bravint"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            `/assets/images/github-icon.svg`
                        }
                        alt="gitHub logo"
                        className={styles.footerLogo}
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/bravint/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            `/assets/images/linkedin-icon.svg`
                        }
                        alt="LinkedIn Logo"
                        className={styles.footerLogo}
                    />
                </a>
            </section>
            <p>&#169;2023 Bravin Thillainathan</p>
        </>
    );
};
