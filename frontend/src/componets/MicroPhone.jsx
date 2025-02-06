import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { FaMicrophone } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";

const MicroPhone = ({ setContent, setIsListening }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setContent(transcript); // Update content when transcript changes
  }, [transcript, setContent]);

  useEffect(() => {
    setIsListening(listening); // Update isListening state in parent

    if (!listening) {
      setTimeout(() => {
        resetTranscript(); // Clear transcript after stopping
      }, 500); // Small delay to ensure it gets set
    }
  }, [listening, setIsListening, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {listening ? (
        <button
          className="btn btn-circle btn-outline text-xl"
          onClick={SpeechRecognition.stopListening}
        >
          <FaCircleStop />
        </button>
      ) : (
        <button
          className="btn btn-circle btn-outline text-xl"
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          <FaMicrophone />
        </button>
      )}
    </div>
  );
};

export default MicroPhone;
