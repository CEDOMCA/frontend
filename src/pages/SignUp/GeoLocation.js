import React, { useEffect, useState, useRef } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import Select from "@mui/material/Select";


import Geonames from "geonames.js";
import PropTypes from "prop-types";

const geonames = new Geonames({
  username: "thalesandrade",
  lan: "en",
  encoding: "JSON"
});

export default function GeoLocation(props) {
  const { locationTitle, geoId, onChange, isCountry } = props;
  const [options, setOptions] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    try {
      const data = async () => {
        (await isCountry)
          ? geonames.countryInfo({}).then(res => {
              console.log(res);
              setOptions(res.geonames);
            })
          : geonames.children({ geonameId: geoId }).then(res => {
              if (res.totalResultsCount) setOptions(res.geonames);
            });
      };
      data();
    } catch (err) {
      console.error(err);
    }
  }, [geoId, isCountry]);

  const inputLabel = useRef(null);

  const handleChange = e => {
    setCurrentItem(e.target.value);
    onChange(e.target.value);
  };

  return (
    <FormControl>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        {locationTitle}
      </InputLabel>

      <Select
        sx={{width: 170}}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currentItem}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {options.map((v, index) => (
          <MenuItem key={index} value={v.geonameId}>
            {isCountry ? v.countryName : v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

GeoLocation.propTypes = {
  locationTitle: PropTypes.string,
  geoId: PropTypes.node,
  isCountry: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

GeoLocation.defaultProps = {
  onChange: undefined
};
