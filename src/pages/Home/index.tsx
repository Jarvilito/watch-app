import React from "react";
import Video from "../../components/Media/Video";
import './style.scss';


const Home = () => {
    return (
        <section className="homepage">
            <Video
                className="homepage__banner"
                path='tis-digital-gifting-HP-Video-Desktop.mp4'
                controls={false}
                loop={true}
                autoPlay={true}
                muted={true} 
            />
        </section>
    );
};

export default Home;