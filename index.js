"use strict";
import alfy from "alfy";

import fs from "fs";

const data = JSON.parse(fs.readFileSync("./data.json"));

const items = data.map((e) => {

  return {
    title: e.title,
    // autocomplete: e.title,
    match: e.title.replaceAll("::", " ").toLowerCase(),
    subtitle: e.url,
    arg: e.url,
    quicklookurl: e.url,
  };
});

alfy.output(items);
