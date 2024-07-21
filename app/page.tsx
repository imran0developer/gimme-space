"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { setInterval } from "timers";
import { getDistortedPara, getSubmitResult } from "./util/algo";

export default function Home() {
  const textRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [originalPara, setOriginalPara] = useState("");
  const [submission, setSubmission] = useState("");
  const [text, setText] = useState("Loading...");

  // fetch random quotes Api function
  async function fetchQuote() {
    const quote = await randomQuote();
    setOriginalPara(quote);

    const distortedText = getDistortedPara(quote);
    setText(distortedText);

    // console.log("#quote: ", quote);
    // console.log("#distortedText: ", distortedText);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  const [result, setResult] = useState({ score: 0, total: 0, accuracy: "0" });

  const heading = "Gimme Space";
  const description =
    "Guess and arrange the text by adjusting spaces to make it correct. Use only the space and backspace keys.";

  // Function to handle keydown events
  const handleKeyDown = (e: any) => {
    const allowedKeys = [
      "Backspace",
      "Space",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown"
    ]; // Allowed keys

    if (e.code === "Space") {
      document.execCommand("insertText", false, " ");
      e.preventDefault();
    }

    if (e.code === "Backspace" || e.code === "Delete") {
      const selection: any = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const { startOffset, endOffset, startContainer, endContainer } = range;
        const textContent = startContainer.textContent;

        if (startOffset === endOffset) {
          if (e.code === "Backspace" && startOffset > 0) {
            if (textContent[startOffset - 1] !== " ") {
              e.preventDefault();
            }
          } else if (e.code === "Delete" && startOffset < textContent.length) {
            if (textContent[startOffset] !== " ") {
              e.preventDefault();
            }
          }
        }
      }
    }
    // Check if the pressed key is allowed
    if (!allowedKeys.includes(e.code)) {
      e.preventDefault();
    }
  };
  const handleChange = (e: any) => {
    setText(e.target.innerText);
  };
  const handleSubmit = () => {
    setIsSubmitted(true);
    const textDiv: any = textRef.current;
    if (textDiv) {
      textDiv.focus();
      const submisionText = textDiv.innerText;
      console.log("SubmisionText", submisionText);
      setSubmission(submisionText);
      const submissionResult = getSubmitResult(originalPara, submisionText);
      setResult({
        score: submissionResult.score,
        total: submissionResult.total,
        accuracy: submissionResult.accuracy
      });
    }
  };
  const handleNext = () => {
    setIsSubmitted(false);
    fetchQuote();
  };
  const handleSubmitOrNext = () => {
    if (!isSubmitted) {
      handleSubmit();
    } else {
      handleNext();
    }
  };

  async function randomQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const quote = await response.json();

    // Output the quote and author name
    // console.log(quote.content)
    // console.log(`- ${quote.author}`)

    return quote.content;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#D2E0FB] dark:bg-slate-800">
      <h1
        className={"text-4xl font-bold mb-4 dark:text-[#D9E4DD] text-[#394867]"}
      >
        {heading}
      </h1>
      <p className="w-[60%] text-center font-medium text-xl mb-6 text-[#687980]">
        {description}
      </p>

      {/* Result */}
      {isSubmitted && (
        <div className="h-full mt-8 gap-x-16 text-2xl font-medium flex items-center justify-between text-[#F6830F] dark:text-[#F7A440]">
          <h2>
            Score: {result.score}/{result.total}
          </h2>
          <h2>Accuracy: {result.accuracy}%</h2>
        </div>
      )}

      <div className="w-[80%]">
        {/* Submit View */}
        {isSubmitted && (
          <section className="flex flex-col items-center justify-between border border-[#687980] rounded-2xl p-4 mt-4">
            {/* Original */}
            <div className="">
              <div className="font-medium text-xl text-[#687980]">
                Original:{" "}
              </div>
              <div
                ref={textRef}
                className="text-3xl p-4 dark:text-[#4AA96C] text-[#059212] font-medium mb-4 bg-transparent"
              >
                {originalPara}
              </div>

              {/* Submission */}
              <div className="font-medium text-xl text-[#687980]">
                Submission:
              </div>
              <div className="text-3xl p-4 text-[#344955] dark:text-[#FFF9DE] mb-6 bg-transparent overflow-visible h-auto">
                {submission}
              </div>
            </div>
          </section>
        )}

        {/* Editor */}
        {!isSubmitted && (
          <div
            contentEditable
            // value={text}
            ref={textRef}
            autoFocus={true} 
            className="mt-24 text-3xl p-4 text-[#344955] dark:text-white bg-transparent "
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          >
            {text}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmitOrNext}
        className="mt-4 px-4 py-2 bg-slate-800 dark:bg-slate-300 text-white dark:text-black rounded font-bold">
        {isSubmitted ? "Next" : "Submit"}
      </button>
    </main>
  );
}
