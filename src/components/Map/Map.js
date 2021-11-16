import React from "react";

const Map = () => {
  return (
    <iframe
      data-aos='fade-up'
      data-aos-anchor-placement='bottom-bottom'
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96233.52033321657!2d-81.58301790849285!3d41.084345844894045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830d7958b2efab7%3A0x29c96c95fd266d04!2sAkron%2C%20OH%2C%20USA!5e0!3m2!1sen!2s!4v1631709411489!5m2!1sen!2s"
      width="100%"
      height="450"
      style={{ border: "0" }}
      allowFullScreen={true}
      loading="lazy"
      title="map"
    ></iframe>
  );
};

export default Map;
