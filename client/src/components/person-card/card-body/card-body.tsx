import React from "react";
import styled from "styled-components";
import "./card-body.css";

export const CardBody = (props: any) => {
  let { label, company, bio, color } = props;
  if (!bio || bio.length === 1) {
    bio = "No bio available !";
  } else {
    const regex = /(<([^>]+)>)/gi;
    bio = bio.replace(regex, "");
  }
  if (!company) {
    company = "No company information given !";
  }

  const StyledCardBody = styled.div`
    background: rgba(${color}, 0.8);
  `;

  return (
    <StyledCardBody className="card-body">
      <b>LABEL: {label}</b>
      <p>{company}</p>
      <p>{bio}</p>
    </StyledCardBody>
  );
};
