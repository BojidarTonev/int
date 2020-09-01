import React from "react";
import { CardBody } from "./card-body/card-body";
import { observer } from "mobx-react";
import { CardOptions } from "./card-options/card-options";
import "./person-card.css";

export const PersonCard = observer((props: any) => {
  const { uuid, company, bio, name, title, avatar, label, color } = props;

  const openModal = () => {
    let modalImg = document.getElementById("modal-img") as any;
    const img = document.getElementById(`img-${uuid}`) as any;
    const modal = document.getElementById("my-modal") as any;
    modal.style.display = "block";
    modalImg.src = img.src;
  };

  const closeModal = () => {
    const modal = document.getElementById("my-modal") as any;
    modal.style.display = "none";
  };

  return (
    <div className="person-card" key={uuid}>
      <div className="left-part">
        <h1>{name}</h1>
        <b>{title}</b>
        <img
          src={avatar}
          height="30px"
          width="50px"
          alt={"avatar not found"}
          id={`img-${uuid}`}
          onClick={openModal}
        />
      </div>
      <div className="right-part">
        <CardOptions uuid={uuid} />
        <CardBody label={label} company={company} bio={bio} color={color} />
      </div>
      <div className="modal" id="my-modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img className="modal-content" id="modal-img" src={avatar} />
      </div>
    </div>
  );
});
