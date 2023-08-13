import './home.css';
import aquarium from './aquarium.png';

function Home() {
    return (
        <div className="body-container">
            <div className="welcome">
                <div className="welcome-image">
                    <img src={aquarium} alt="Aquarium" />
                </div>
                <div className="welcome-message">
                    <h1>Welcome</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, similique non reiciendis omnis a quae assumenda asperiores, totam quas sed vero modi laudantium itaque qui cumque vitae nesciunt amet! Sunt.</p>
                </div>
            </div>
            <div>
                Hello
            </div>
        </div>
    )
}

export default Home;