import { useEffect, useState } from 'react';

import { fixTeamName } from '../../../utils.js';

import styles from '../../../styles/FilterMatches.module.css';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

export const FilterMatches = (props) => {
    const { fixtures, teams, id, filteredMatches } = props;

    const [matchStatusList, setMatchStatusList] = useState([]);
    const [teamsList, setTeamsList] = useState([]);

    const [displayFiltersForm, setDisplayFiltersForm] = useState(false);

    const [selectedTeams, setSelectedTeams] = useState([]);
    const [selectedFixtureType, setSelectedFictureType] = useState('all');
    const [selectedSortType, setSelectedSortType] = useState('date');

    useEffect(() => {
        const genMatchStatusArray = () => {
            const array = fixtures.matches.filter((element) => {
                if (element.status !== 'FINISHED') return element.status;
            });
            const newarray = array.map((element) => element.status);
            const status = Array.from(new Set(newarray));
            console.log(status);
            setMatchStatusList(status);
        };

        const genTeamsArray = () => {
            const status = [...teams.teams];
            console.log(status);
            setTeamsList(status);
        };

        genMatchStatusArray();
        genTeamsArray();
    }, [fixtures, teams]);

    console.log(`states`, {
        matchStatusList,
        teamsList,
        displayFiltersForm,
        selectedTeams,
        selectedFixtureType,
        selectedSortType
    });

    const handleFixtureTypeChange = (event) => {
        setSelectedFictureType(event.target.value);
    };

    const handleTeamSelectionChange = (event) => selectedTeams.includes(event.target.id) ? setSelectedTeams(selectedTeams.filter(element => element !== event.target.id)) : setSelectedTeams([...selectedTeams, event.target.id]);


    const handleSortChange = (event) => {
        setSelectedSortType(event.target.value);
    };

    const HandleShowFIlterClick = () => setDisplayFiltersForm(!displayFiltersForm);

    const checkChecked = (element) => selectedTeams.includes(element) ? true : false;

    return (
        <div className={styles.filterSection}>
            <div className={styles.blankSpace}>&nbsp;</div>
            <div className={styles.filterSummary}>
                <div className={styles.showFormButton} onClick={() => HandleShowFIlterClick()}>
                <TuneRoundedIcon className={styles.TuneRoundedIcon}/>
                <p>Filters</p>
                </div>
                <p className={styles.showActiveFilters}><strong>Active Filters:</strong> Show {selectedFixtureType} matches, matches sorted by {selectedSortType}</p>
            </div>
            <div className={styles.blankSpace}>&nbsp;</div>
            {displayFiltersForm && (
                <>
            <form className={styles.form}>
                <div className={styles.formSelectContainer}>
                    <div>
                        <h3>Show Matches</h3>
                        <select
                            id="type"
                            name="type"
                            className=""
                            onChange={(event) => handleFixtureTypeChange(event)}
                        >
                            <option value="all">Show All</option>
                            {matchStatusList.map((element) => {
                                return (
                                    <option value={element.toLowerCase()}>
                                        {element.toLowerCase()}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <h3>Sort Match List by</h3>
                        <select
                            id="league"
                            name="league"
                            className=""
                            onChange={(event) => handleSortChange(event)}
                        >
                            <option value="Date">Date</option>
                            <option value="Matchday">Matchday</option>
                        </select>
                    </div>
                </div>
                <h3>Filter by Team</h3>
                <section className={styles.selectteam}>
                    {teamsList.map((element) => {
                        return (
                            <div className={styles.teamSelect}>
                                <input
                                    type="checkbox"
                                    id={fixTeamName(id, element.name)}
                                    checked={checkChecked(fixTeamName(id, element.name))}
                                    name={fixTeamName(id, element.name)}
                                    onClick={(event) =>
                                        handleTeamSelectionChange(event)
                                    }
                                />
                                <label htmlFor={element.id}>
                                    {fixTeamName(id, element.name)}
                                </label>
                            </div>
                        );
                    })}
                </section>
            </form>
            <div className={styles.blankSpace}>&nbsp;</div>
            </>
            )}
        </div>
    );
};
