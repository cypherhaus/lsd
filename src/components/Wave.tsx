import { useRef } from "react";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import test from "./test.json";

const Wave = ({ track, onWaveform }: any) => {
  const wavesurferRef = useRef<any>();

  const handleMount = async (waveSurfer: any) => {
    wavesurferRef.current = waveSurfer;

    if (wavesurferRef.current) {
      console.log("here");
      await wavesurferRef.current.load(track, test);
      const json = await wavesurferRef.current.exportPCM(1024, 1000, true);
      onWaveform(json);

      wavesurferRef.current.on("loading", (data: any) => {
        console.log("loading --> ", data);
      });
    }
  };

  return (
    <WaveSurfer onMount={handleMount}>
      <WaveForm
        id="waveform"
        // @ts-ignore
        waveColor="white"
        barWidth={3}
        barRadius={3}
        responsive={true}
        cursorWidth={1}
        progressColor="#F6BE00"
        height={200}
        width={400}
        barGap={3}
        cursorColor="transparent"
      />
    </WaveSurfer>
  );
};

export default Wave;
