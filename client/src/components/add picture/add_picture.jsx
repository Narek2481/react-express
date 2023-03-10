import { useState } from "react";
import axios from "axios";
const Add_picture = () => {
    const [image, setImage] = useState(null)

    const on_image_change = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const img_styles = (image) => {
        if(!image){
            return {display:"none"}
        }
        return {}

    };
    return (
        <div className="add_price">
            <button 
            style={img_styles(image)}
            onClick={() => {
                axios.post("http://localhost:4000/image_loud",{image});
                setImage(null)
            }}>
                Add
            </button>
            <input type="file" onChange={on_image_change}/>
            <img 
            alt="preview image" src={image}  
            style={img_styles(image)} 
            accept="image/*" 
            />
            
        </div>
    )
}
export default Add_picture;