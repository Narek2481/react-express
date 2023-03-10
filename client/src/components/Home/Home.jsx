import { useEffect, useState } from "react";
import axios from "axios";
import Image_component from "./image_forme/image_component";
import { Link } from "react-router-dom"
import Select_category from "./select_category/select_category";




export default function Home() {
    const [fetching, setFetching] = useState(true);
    const [data, setData] = useState([]);
    const [nesting, set_nesting] = useState(0);
    // requset image download
    useEffect(() => {
        if (fetching) {
            axios.get("http://localhost:4000/image_loud")
                .then((res) => {
                    setData((data) => [...data, ...res.data]);
                })
                .catch(err => {
                    alert(err)
                })
                .finally(() => setFetching(false))
        }
    }, [fetching]);
    // requset image download
    useEffect(() => {
        document.addEventListener("scroll", scroll_hendler);
        return () => {
            document.removeEventListener("scroll", scroll_hendler)
        }
    }, []);
    // requset select 
    useEffect(() => {
        if (nesting > 0) {
            axios.get("http://localhost:4000/select_get",
                {
                    nesting
                })
                .then((res) => {

                })
                .catch(err => {
                    alert(err)
                })
        }
    }, [nesting]);
    // function scroll event 
    const scroll_hendler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            // console.log("scroll")
            setFetching(true);
        }
    }
    return (
        <div className="home">
            <div className="add_container">
                {/* route for adding pictures */}
                <Link className="go_add_image" to={"/add_image"}>
                    Add Image
                </Link>
            </div>
            {/* category for pictures */}
            <Select_category props={{ set_nesting }}></Select_category>
            <div style={
                {
                    textAlign: "center",
                    padding: "20px 0 0 0"
                }
            }>
                {
                    // backend request for images upload
                    fetching ? "Loading..." : ""
                }
            </div>
            {
                // an array from the backend that is being rendered for component Image_component
                data.map((elem) => {
                    return (
                        <Image_component props={elem} key={Math.random() * 100}></Image_component>
                    )
                })
            }

        </div>
    );

}