import ProductCatalog from "../components/ProductCatalog";

function Home(){
    return(
        <>
            <div className="home">
                <div className="container">
                    <div className="home_catalog">
                        <ProductCatalog />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;