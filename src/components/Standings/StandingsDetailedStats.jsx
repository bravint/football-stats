import '../../styles/StandingsListItem.css';

export const TeamStats = (props) => {
    const { element } = props;
    return (
        <section className="extra-stats expandable">
            <p>{element.team.name}</p>
        </section>
    );
};
