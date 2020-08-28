import React, { useState } from "react";
import { CardBody } from "./card-body/card-body";
import "./person-card.css";

export const PersonCard = (props: any) => {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("255, 255, 255");
  const { uuid, company, bio, name, title, avatar } = props;

  const onSubmit = (e: any) => {
    e.preventDefault();

    const labelInput = document.getElementById(
      `card-label-input-${uuid}`
    ) as any;
    const colorInput = document.getElementById(
      `card-color-select-${uuid}`
    ) as any;

    setLabel(labelInput.value);
    setColor(colorInput.value);
  };

  return (
    <div className="person-card" key={uuid}>
      <div className="left-part">
        <h1>{name}</h1>
        <b>{title}</b>
        <img src={avatar} height="30px" width="50px" alt="" />
      </div>
      <div className="right-part">
        <div className="card-options">
          <input type="text" id={`card-label-input-${uuid}`} />
          <select name="color-picker" id={`card-color-select-${uuid}`}>
            <option value="0, 0, 0">black</option>
            <option value="22, 179, 2">green</option>
            <option value="2, 11, 179">blue</option>
            <option value="213, 227, 16">yellow</option>
            <option value="255, 255, 255">white</option>
          </select>
          <button type="button" onClick={onSubmit}>
            submit
          </button>
        </div>
        <CardBody label={label} company={company} bio={bio} color={color} />
      </div>
    </div>
  );
};
