import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {

    const [userData, setUserData] = React.useState({ userName: "", userDescription: "", userAvatar: "" });
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserData({
                    userName: res.name,
                    userDescription: res.about,
                    userAvatar: res.avatar,
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }, []
    )

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })

            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__left-side">
                    <div onClick={props.onEditAvatar} className="profile__avatar-box">
                        <img className="profile__avatar" alt="Аватар" src={userData.userAvatar} />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__text">{userData.userName}</h1>
                            <button onClick={props.onEditProfile} className="profile__edit-button" type="button"></button>
                        </div>
                        <p className="profile__status">{userData.userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__button-add-card" type="button"></button>
            </section>
            <section className="elements">
                {cards.map(item => {
                    return (
                        <Card onCardClick={props.onCardClick} link={item.link} name={item.name} likes={item.likes.length} key={item._id} />
                    )
                })}
            </section>
        </main>
    )
}

export default Main