import FixturesListItem from "./FixturesListItem"

function Fixtures(props) {
    const { fixtures, teams } = props
    
    return (
        <>
            {fixtures.matches && (
            <section className="table">
                <FixturesListItem fixtures={fixtures} teams={teams}/>
            </section>
            )}
        </>
    );
}

export default Fixtures