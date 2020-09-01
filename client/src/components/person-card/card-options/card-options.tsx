import React, { useContext } from "react";
import { AppStore, appContext } from "../../../store/AppStore";
import "./card-options.css";

export const CardOptions = (props: any) => {
  const store: AppStore = useContext(appContext);

  const { uuid } = props;

  const onSubmit = () => {
    const labelInput = document.getElementById(
      `card-label-input-${uuid}`
    ) as any;
    const colorInput = document.getElementById(
      `card-color-select-${uuid}`
    ) as any;

    store.updatePersonById(uuid, labelInput.value, colorInput.value);
  };

  return (
    <div className="card-options" key={`card-options-${uuid}`}>
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
  );
};
