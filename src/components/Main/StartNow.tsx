import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const StartNow = (props: Props) => {
  const navigation = useNavigate();
  return (
    <div className="p-8 flex flex-col gap-3 items-center justify-center bg-indigo-600 my-12 rounded-xl text-white">
      <img src="/logo.png" className="w-16 " alt="" />
      <p>GençLink Sayesinde Sosyalleşmek Artık Çok Kolay</p>
      <Button
        variant="filled"
        color="white"
        className="text-indigo-600"
        onClick={() => navigation("/etkinlik-listesi")}
      >
        Start Now
      </Button>
    </div>
  );
};

export default StartNow;
