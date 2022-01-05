import Form from "../SearchForm/SearchForm";

function SidebarSearch(props) {
    const { setId } = props;

    return <Form setId={setId} />;
}

export default SidebarSearch;
