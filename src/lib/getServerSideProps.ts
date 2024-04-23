
export async function getServerSideProps() {

    const queryParams = new URLSearchParams();
    const searchQuery = queryParams.get('query');
    const page = queryParams.get('page');
    console.log('searchQuery', searchQuery)
    console.log('Spage', page)

}