import { Button } from "@mantine/core";
import React from "react";

type Props = {};

const StartNow = (props: Props) => {
  return (
    <div className="p-8 flex flex-col gap-3 items-center justify-center bg-indigo-600 my-12 rounded-xl text-white">
      <h1 className="text-5xl font-bold font-outfit">Logo</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos,
        totam.
      </p>
      <Button variant="filled" color="white" className="text-indigo-600">
        Start Now
      </Button>
    </div>
  );
};

export default StartNow;
